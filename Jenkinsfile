#!/usr/bin/env groovy
/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any

    parameters {
        booleanParam(name: 'BOOLEAN_PARAM', defaultValue: false, description: '')
        choice(name: 'SampleParam', choices: 'false\ntrue', description: 'This is a sample parameter.')

        string(name: 'STATEMENT', defaultValue: 'hello; ls /', description: 'What should I say?')

        activeChoiceParam('CHOICE-1') {
            description('Allows user choose from multiple choices')
            filterable()
            choiceType('SINGLE_SELECT')
            groovyScript {
                script('["choice1", "choice2"]')
                fallbackScript('"fallback choice"')
            }
        }
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
