# SGSYEN 智库极精部署指南 (GCP Cloud Run & GitHub Actions)

本指南针对您的两个项目进行配置：**前端展示网站 (`sgsyen-web`)** 和 **后端学术接口 (`sgsyen-api`)**。它们都将部署在 Google Cloud 容器引擎 **Cloud Run** 上，并绑定您的专属域名 **`soulshock.net`** 及 **`sgsyen.com`**。

---

## 🏛️ 架构简图
```
[ 🌎 终端用户 ] 
      │ 
      ├──► (soulshock.net / sgsyen.com) ──► [ 🚀 GCP Cloud Run Frontend (sgsyen-web) ]
      │                                             │ (前端请求)
      │                                             ▼
      └──► (api.soulshock.net) ───────────► [ ⚡ GCP Cloud Run Backend (sgsyen-api) ]
                                                    │
                                                    ├──► [ 🗄️ Supabase Database (数据层) ]
                                                    └──► [ 🪣 Google Cloud Storage (PDF刊物) ]
```

---

## 🛠️ 第一步：准备 GCP 基础凭证

要在 GitHub 仓库中启用全自动 CI/CD 部署，您首先需要通过 [Google Cloud Console](https://console.cloud.google.com) 创建一个专属的**服务账号 (Service Account)**：

1. **创建服务账号**：
   - 前往 `IAM & Admin` -> `Service Accounts`。
   - 创建账号命名为 `github-deployer`。
2. **授予必要权限 (Role)**：
   - 授予该服务账号以下三项核心角色：
     * **Cloud Run Admin** (`roles/run.admin`) — 允许创建/更新容器实例。
     * **Storage Admin** (`roles/storage.admin`) — 允许上传构建阶段生成的 Docker 镜像。
     * **Service Account User** (`roles/iam.serviceAccountUser`) — 执行运行时关联。
3. **导出 JSON 金钥密码**：
   - 进入创建的账号，点击 `Keys` -> `Add Key` -> `Create New Key` -> 选择 **JSON** 格式并下载。
   - 保留该 `.json` 凭证文件。

---

## ⚡ 第二步：配置后端 API 部署 (`sgsyen-api`)

后端基于 **Hono** 驱动，已在 `sgsyen-api` 文件夹下准备好 `Dockerfile`。我们将通过 GitHub Actions 在您每次提交代码时，自动构建并部署至 Cloud Run。

### 1. 添加 GitHub Secrets
前往您在 GitHub 上的后端仓库 `sgsyen-api` 的 `Settings` -> `Secrets and variables` -> `Actions`。点击 **New repository secret**，添加以下值：
* `GCP_SA_KEY`：将刚才下载的 GCP 服务账号 **JSON 金钥的完整内容** 粘贴进去。
* `GCP_PROJECT_ID`：输入您的 GCP 项目 ID (Project ID)。

### 2. 创建 GitHub CI/CD 工作流文件
在您的 `sgsyen-api` 项目根目录下，新建路径并创建文件 `.github/workflows/deploy.yml`（代码如下）：

```yaml
name: Deploy Backend to Cloud Run

on:
  push:
    branches:
      - main # 触发推送的分支

env:
  PROJECT_ID: ${{ secrets.GCP_PROJECT_ID }}
  REGION: asia-east1 # 您可以自由选择算力节点，台湾节点较慢推荐香港/台湾
  SERVICE_NAME: sgsyen-api

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout Code
      uses: actions/checkout@v4

    - name: Authenticate with Google Cloud
      uses: google-github-actions/auth@v2
      with:
        credentials_json: ${{ secrets.GCP_SA_KEY }}

    - name: Set up Cloud SDK
      uses: google-github-actions/setup-gcloud@v2

    - name: Configure Docker to use Auth
      run: |
        gcloud auth configure-docker --quiet

    - name: Build and Push Docker Image
      run: |
        docker build -t gcr.io/$PROJECT_ID/$SERVICE_NAME:$GITHUB_SHA .
        docker push gcr.io/$PROJECT_ID/$SERVICE_NAME:$GITHUB_SHA

    - name: Deploy to Cloud Run
      run: |
        gcloud run deploy $SERVICE_NAME \
          --image gcr.io/$PROJECT_ID/$SERVICE_NAME:$GITHUB_SHA \
          --region $REGION \
          --platform managed \
          --allow-unauthenticated \
          --port 3000 \
          --set-env-vars="SUPABASE_URL=您的SUPABASE公网URL,SUPABASE_ANON_KEY=您的SUPABASE密钥,GCS_BUCKET_NAME=您的刊物桶名"
```

---

## 🚀 第三步：配置前端部署 (`sgsyen-web`)

前端在 Cloud Run 上作为高性能静态/SSR 节点运行，同样支持一键自动化。

### 1. 同步添加 GitHub Secrets
进入前端 GitHub 仓库 `sgsyen-web` 的 `Settings` -> `Secrets`，添加相同的：
* `GCP_SA_KEY` (GCP 服务账号 JSON 密码内容)
* `GCP_PROJECT_ID` (您的 GCP 项目名称)

### 2. 创建前端 CI/CD 工作流文件
在 `sgsyen-web` 项目根目录下，创建文件 `.github/workflows/deploy.yml`：

```yaml
name: Deploy Frontend to Cloud Run

on:
  push:
    branches:
      - main

env:
  PROJECT_ID: ${{ secrets.GCP_PROJECT_ID }}
  REGION: asia-east1
  SERVICE_NAME: sgsyen-web

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout Code
      uses: actions/checkout@v4

    - name: Authenticate with Google Cloud
      uses: google-github-actions/auth@v2
      with:
        credentials_json: ${{ secrets.GCP_SA_KEY }}

    - name: Set up Cloud SDK
      uses: google-github-actions/setup-gcloud@v2

    - name: Configure Docker to use Auth
      run: |
        gcloud auth configure-docker --quiet

    - name: Build and Push Docker Image
      run: |
        docker build -t gcr.io/$PROJECT_ID/$SERVICE_NAME:$GITHUB_SHA .
        docker push gcr.io/$PROJECT_ID/$SERVICE_NAME:$GITHUB_SHA

    - name: Deploy to Cloud Run
      run: |
        gcloud run deploy $SERVICE_NAME \
          --image gcr.io/$PROJECT_ID/$SERVICE_NAME:$GITHUB_SHA \
          --region $REGION \
          --platform managed \
          --allow-unauthenticated \
          --port 8080
```

---

## 🎯 第四步：将 `soulshock.net` / `sgsyen.com` 绑定至 GCP

当您通过上述 GitHub Actions 将服务顺利部署到 Cloud Run 后，系统会为您的服务生成一个随机的默认域名（如 `https://sgsyen-web-xxx.run.app`）。此时需要将您的专属域名与该服务进行强关联。

### 绑定步骤 (推荐最简方式)：
1. 打开 [GCP Cloud Run 控制台](https://console.cloud.google.com/run)。
2. 点击进入已经成功部署的 **`sgsyen-web`** 服务详情。
3. 在顶部导航栏，点击 **`MANAGE CUSTOM DOMAINS`** (管理自定义网域)。
4. 点击 **`ADD MAPPING`**：
   - 选择服务为：`sgsyen-web`。
   - 输入您持有的域名：**`soulshock.net`** (或者 **`sgsyen.com`**)。
5. 系统在校验所有权后会提供一个 **`CNAME`** 或 **`A`** 记录解析清单组。
6. **在域名解析商处配置 DNS**：
   - 登录您的域名托管商（如 GoDaddy、Cloudflare 等）。
   - 添加一条 CNAME 记录挂载到 Google Cloud 为您生成的边缘地址（比如 `ghs.googlehosted.com`）。
   - 保存后，Google Cloud 会自动为您免费签发并续期高性能的 **SSL 证书 (HTTPS)**。

---

## 🛡️ 系统安全优势回顾
* **全自动极速交付**：您在本地编辑代码后，只需 `git push origin main` 推送，GitHub 就会在一分钟内完成编译、安全性封装并启动 Cloud Run 蓝绿灰度无缝替换。
* **Google GCS 文件瞬时防御**：SGSYEN 报告下载使用 **10 分钟临时签名的 Signed URL 安全路径**。该机制完全防范了直接向公网裸露 PDF 文件带来的数据泄漏风控，契和商业咨询一等密级的防护契约。
