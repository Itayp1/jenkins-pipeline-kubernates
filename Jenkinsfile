#!/usr/bin/env groovy
/* groovylint-disable LineLength */
/* groovylint-disable-next-line CompileStatic */

pipeline {
    agent any
    environment {
        GIT_REPO_TOKEN     = credentials('jenkinsRepo')
        DOCKER_HUB_TOKEN = credentials('DOCKER_HUB_TOKEN')
        VERSION = 1
    }
    stages {
        stage('Setup parameters') {
            steps {
                script {
                    properties([

                        parameters([
                                            choice(
                                name: 'Operation',
                                choices: ['Build', 'Deploy']
                            ),
               string(
                                defaultValue: 'scriptcrunch',
                                name: 'STRINGPARAMETER',
                                trim: true
                            ),
                               [$class: 'CascadeChoiceParameter',
                                choiceType: 'PT_SINGLE_SELECT',
                                description: 'Select the Env Name from the Dropdown List',
                                filterLength: 1,
                                filterable: true,
                                name: 'RepoName',
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
                                        http.setRequestProperty('Authorization', 'token ${GIT_REPO_TOKEN}')
                                        http.connect()
                                        def response = [:]
                                        if (http.responseCode == 200) {
                                            response = new JsonSlurper().parseText(http.inputStream.getText('UTF-8'))
                                        } else {
                                            response = new JsonSlurper().parseText(http.errorStream.getText('UTF-8'))
                                        }
                                        def resArr = []
                                        response .each { resArr.push(it.name) }
                                        return resArr
                                     } catch (Exception e) {
                                          return [e.toString()]
                                     }
                                            """
                                    ]
                                ]
                    ],
                            [$class: 'DynamicReferenceParameter',
                                    choiceType: 'ET_FORMATTED_HTML',
                                    omitValueField: true,
                                    description: 'Please provide a Elastic alias label',
                                    name: 'PC_CPU',
                                    randomName: 'choice-parameter-5631314456178624',
                                    referencedParameters: 'RepoName, STRINGPARAMETER',
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
                                                                import groovy.json.JsonSlurper
                                                                def popai  = 222

                                                        try {

                                                                def http = new URL('https://hub.docker.com/v2/repositories/itayp/${RepoName}/tags?page_size=100').openConnection() as HttpURLConnection
                                                                http.setRequestMethod('GET')
                                                                http.setDoOutput(true)
                                                                http.setRequestProperty('Authorization', 'JWT ${DOCKER_HUB_TOKEN}')
                                                                http.connect()
                                                                def response = [:]
                                                                if (http.responseCode == 200) {
                                                                    response = new JsonSlurper().parseText(http.inputStream.getText('UTF-8'))
                                                                } else {
                                                                    response = new JsonSlurper().parseText(http.errorStream.getText('UTF-8'))
                                                                }
                                                            def resArr = []
                                                            response.results.each { resArr.push(it.name) }
                                                            // return resArr

                                                            STRINGPARAMETER =resArr[0]
                                                              inputBox="<input name="value" value=STRINGPARAMETER type="text">"

                                                            } catch (Exception e) {
                                                        // return [e.toString()]
                                                        }
                                                        return inputBox

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
