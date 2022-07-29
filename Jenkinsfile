#!/usr/bin/env groovy
/* groovylint-disable LineLength */
/* groovylint-disable-next-line CompileStatic */

pipeline {
    agent any

    stages {
        stage('Setup parameters') {
            steps {
                script {
                    properties([
                        parameters([
                            choice(
                                name: 'RepositoryName',
                                choices: ['zoo-auto-battles', 'zoo-market', 'trading-alert']
                            ),
                             choice(
                                name: 'Env',
                                choices: ['Build', 'Deploy']
                            ),
                            // booleanParam(
                            //     defaultValue: true,
                            //     description: '',
                            //     name: 'BOOLEAN'
                            // ),
                            // text(
                            //     defaultValue: '''
                            //     this is a multi-line
                            //     string parameter example
                            //     ''',
                            //      name: 'MULTI-LINE-STRING'
                            // ),
                            // string(
                            //     defaultValue: 'scriptcrunch',
                            //     name: 'STRING-PARAMETER',
                            //     trim: true
                            // ),
                            choice(name:'deploy_env', choices:['yes', 'no'], description: 'Do you need upgrade your PC'),
                            [$class: 'DynamicReferenceParameter',
                                    choiceType: 'ET_FORMATTED_HTML',
                                    omitValueField: true,
                                    description: 'Please provide a Elastic alias label',
                                    name: 'PC_RAM',
                                    randomName: 'choice-parameter-5631314456178624',
                                    referencedParameters: 'Env',
                                    script: [
                                            $class: 'GroovyScript',
                                            fallbackScript: [
                                                    classpath: [],
                                                    sandbox: true,
                                                    script:
                                                            'return[\'nothing.....\']'
                                            ],
                                            script: [
                                                    classpath: [],
                                                    sandbox: true,
                                                    script:
                                                            """
                                            if(Env.equals('Build')) {
                                                // return "dddddddddddd"
                                                inputBox="<input name='value' type='text' value='Kingston 8GB'>"
                                            } else {
                                                                                                // return "dsdffsfddddddd"

                                                inputBox="<input name='value' type='text' value='Kingston 8GB' disabled>"
                                            }
                                        """
                                            ]
                                    ]
                                ],
          [$class: 'ChoiceParameter',
            choiceType: 'PT_SINGLE_SELECT',
            description: 'Select the Env Name from the Dropdown List',
            filterLength: 1,
            filterable: true,
            name: 'Env3',
            randomName: 'choice-parameter-5631314439613978',
            script: [
                $class: 'GroovyScript',
                fallbackScript: [
                    classpath: [],
                    sandbox: true,
                    script:"""
                        return[\'Could not get Env\']
                        """
                ],
                script: [
                    classpath: [],
                    sandbox: true,
                    script:"""
import groovy.json.JsonSlurper
    try {

                    def http = new URL('https://api.github.com/user/repos?visibility=private').openConnection() as HttpURLConnection
                    http.setRequestMethod('GET')
                    http.setDoOutput(true)
                     http.setRequestProperty('Authorization', 'token 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 ')
                    http.connect()
                    def response = [:]
                    if (http.responseCode == 200) {
                        response = new JsonSlurper().parseText(http.inputStream.getText('UTF-8'))
                    } else {
                        response = new JsonSlurper().parseText(http.errorStream.getText('UTF-8'))
                    }
def resArr = [response[0].name]
// response .each { resArr.push(it.name) }
return resArr
                 } catch (Exception e) {
return [e.toString()]
    }
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
