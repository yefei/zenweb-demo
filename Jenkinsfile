pipeline {
  agent any

  environment {
    IMAGE_NAME = 'zenweb-blank'
    TENCENTYUN_DOCKER_PREFIX = 'ccr.ccs.tencentyun.com/xxxxx'
    TENCENTYUN_DOCKER_TOKEN = 'xxxxx'
  }

  stages {
    stage('检出') {
      steps {
        checkout([$class: 'GitSCM', branches: [[name: env.GIT_BUILD_REF]], userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]])
      }
    }

    stage('检查') {
      steps {
        sh 'npm i -g eslint'
        sh 'npm run lint'
      }
    }

    stage('构建') {
      parallel {
        stage('Docker') {
          steps {
            script {
              def imageName = "${IMAGE_NAME}:${env.GIT_LOCAL_BRANCH}"
              def versionImageName = "${env.TENCENTYUN_DOCKER_PREFIX}/${imageName}-${env.CI_BUILD_NUMBER}"
              def latestImageName = "${env.TENCENTYUN_DOCKER_PREFIX}/${imageName}-latest"
              def image
              docker.withRegistry('https://ccr.ccs.tencentyun.com', TENCENTYUN_DOCKER_TOKEN) {
                // 尝试拉取最后版本作为缓存
                try {
                  docker.image(latestImageName).pull()
                  image = docker.build(versionImageName, "--cache-from ${latestImageName} .")
                } catch (exc) {
                  echo '缓存拉去失败，忽略...'
                  image = docker.build(versionImageName)
                }
                // 推送
                image.push()
                // 标记最后版本作为缓存
                sh "docker tag ${versionImageName} ${latestImageName}"
                sh "docker push ${latestImageName}"
              }
            }
          }
        }
      }
    }
  }
}
