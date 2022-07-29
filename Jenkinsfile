#!/usr/bin/env groovy
/* groovylint-disable-next-line CompileStatic */
import groovy.json.JsonSlurper

/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any

    parameters {
        booleanParam(name: 'BOOLEAN_PARAM', defaultValue: false, description: '')
        choice(name: 'SampleParam', choices: 'false\ntrue', description: 'This is a sample parameter.')

        string(name: 'STATEMENT', defaultValue: 'hello; ls /', description: 'What should I say?')
    }

    stages {
        stage('Setup parameters') {
            steps {
                script {
                    properties([
                        parameters([
                            choice(
                                choices: ['ONE', 'TWO'],
                                name: 'PARAMETER_01'
                            ),
                            booleanParam(
                                defaultValue: true,
                                description: '',
                                name: 'BOOLEAN'
                            ),
                            text(
                                defaultValue: '''
                                this is a multi-line
                                string parameter example
                                ''',
                                 name: 'MULTI-LINE-STRING'
                            ),
                            string(
                                defaultValue: 'scriptcrunch',
                                name: 'STRING-PARAMETER',
                                trim: true
                            ),
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
                                            """
               try {
                    def body = '{"id": 120}'
                    def http = new URL('https://api.github.com/user/repos?visibility=private').openConnection() as HttpURLConnection
                    http.setRequestMethod('GET')
                    http.setDoOutput(true)
                    http.setRequestProperty('Accept', 'application/json')
                    http.setRequestProperty('Authorization', 'token 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')

                    http.outputStream.write(body.getBytes('UTF-8'))
                    http.connect()

                    def response = [:]

                    if (http.responseCode == 200) {
                        response = new JsonSlurper().parseText(http.inputStream.getText('UTF-8'))
                    } else {
                        response = new JsonSlurper().parseText(http.errorStream.getText('UTF-8'))
                    }

                    println "response: ${response}"
                } catch (Exception e) {
               // handle exception, e.g. Host unreachable, timeout etc.
               }

                        return['dev','stage','prod']
                                            """

                                        ]
                                    ]
                                ]
                        ])
                    ])
                }
            }
        }
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
