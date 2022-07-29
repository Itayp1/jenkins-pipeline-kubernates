#!/usr/bin/env groovy
/* groovylint-disable-next-line CompileStatic */

/* groovylint-disable-next-line CompileStatic */

properties([
                            parameters([
                                [$class: 'ChoiceParameter',
                                    choiceType: 'PT_SINGLE_SELECT',
                                    description: 'Select the Environemnt from the Dropdown List',
                                    filterLength: 1,
                                    filterable: false,
                                    name: 'Env',
                                    script: [
                                        $class: 'GroovyScript',
                                        fallbackScript: [
                                            classpath: [],
                                            sandbox: false,
                                            script:
                                                "return['Could not get The environemnts']"
                                        ],
                                        script: [
                                            classpath: [],
                                            sandbox: false,
                                            script:
                                                "return['dev','stage','prod']"
                                        ]
                                    ]
                                ]
                                        ]
                                ]
                            ])
                        ])

pipeline {
    agent any

    parameters {
        booleanParam(name: 'BOOLEAN_PARAM', defaultValue: false, description: '')
        choice(name: 'SampleParam', choices: 'false\ntrue', description: 'This is a sample parameter.')

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
