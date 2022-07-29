#!/usr/bin/env groovy
/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any

    parameters {
        booleanParam('RUN_TESTS', true, 'uncheck to disable tests')

        string(name: 'STATEMENT', defaultValue: 'hello; ls /', description: 'What should I say?')
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
