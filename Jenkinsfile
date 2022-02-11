pipeline {
  agent any

  environment {
    IMAGE_NAME = 'zenweb-blank'
    DOCKER_REGISTRY = 'https://ccr.ccs.tencentyun.com'
    DOCKER_PREFIX = 'ccr.ccs.tencentyun.com/xxxxx'
    DOCKER_TOKEN = 'xxxxx'
  }

  stages {
    stage('检出') {
      steps {
        checkout([$class: 'GitSCM', branches: [[name: env.GIT_BUILD_REF]], userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]])
      }
    }

    stage('构建') {
      parallel {
        stage('Docker') {
          steps {
            script {
              def version = "${env.GIT_LOCAL_BRANCH}-${env.CI_BUILD_NUMBER}"
              def imageName = "${IMAGE_NAME}:${version}"
              def tagName = "${DOCKER_PREFIX}/${imageName}"
              docker.withRegistry(DOCKER_REGISTRY, DOCKER_TOKEN) {
                docker.build(tagName, "--build-arg VERSION=${version} .")
                docker.push()
              }
            }
          }
        }
      }
    }
  }
}
