pipeline {
    agent any
    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }
        stage('Build Docker Images') {
            steps {
                sh 'docker build -t swappybizz/frontend ./frontend'
                sh 'docker build -t swappybizz/backend ./backend'
            }
        }
        stage('Push Docker Images') {
            steps {
                withCredentials([string(credentialsId: 'docker-hub', variable: 'DOCKER_PASSWORD')]) {
                    sh 'echo $DOCKER_PASSWORD | docker login -u swappybizz --password-stdin'
                    sh 'docker push swappybizz/frontend'
                    sh 'docker push swappybizz/backend'
                }
            }
        }
    }
}
