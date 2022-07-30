#!/usr/bin/env groovy
/* groovylint-disable LineLength */
/* groovylint-disable-next-line CompileStatic */

pipeline {
    agent any
    environment {
        GIT_REPO_TOKEN     = credentials('jenkinsRepo')
        DOCKER_HUB_TOKEN = credentials('DOCKER_HUB_TOKEN')
        KUBECONFIG = credentials('KUBECONFIG')
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
                                        def http = new URL('https://api.github.com/user/repos?visibility=all&per_page=222').openConnection() as HttpURLConnection
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
                                    description: 'the last version of the image',
                                    name: 'ImageVersion',
                                    randomName: 'choice-parameter-5631314456178621',
                                    referencedParameters: 'RepoName',
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

                                                        try {

                                                                def http = new URL("https://hub.docker.com/v2/repositories/itayp/"+RepoName+"/tags?page_size=100").openConnection() as HttpURLConnection
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

                                                               inputBox="<p>"+resArr[0]+"</p>"

                                                            } catch (Exception e) {
                                                        // return [e.toString()]
                                                        }
                                                        return inputBox

                                """
                                            ]
                                    ]
                            ],

                                 [$class: 'CascadeChoiceParameter',
                                choiceType: 'PT_SINGLE_SELECT',
                                description: 'Select the Env Name from the Dropdown List',
                                filterLength: 1,
                                filterable: true,
                                name: 'NextImageVersion',
                                randomName: 'choice-parameter-5631314439613946',
                                referencedParameters: 'RepoName',
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

                                                                def http = new URL("https://hub.docker.com/v2/repositories/itayp/"+RepoName+"/tags?page_size=100").openConnection() as HttpURLConnection
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
                                        def ImageVersion = resArr[0]
                                          def nextversion
                                                        def isInteger= ImageVersion.toString().isInteger()
                                                        if(isInteger){
                                                        nextversion= Integer.parseInt(ImageVersion )+1
                                                         }else{
                                                        nextversion = 1
                                                        }

                                        return [nextversion]
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

        stage('Clone') {
            steps {
                cleanWs()

                echo 'Cloning The Repo..'
                bat "git clone https://itayp1:${GIT_REPO_TOKEN}@github.com/Itayp1/${RepoName}.git"
                bat "git clone https://itayp1:${GIT_REPO_TOKEN}@github.com/Itayp1/jenkins-pipeline-kubernates.git"

                echo "params:${params}"
                echo "env:${env}"
            }
        }

        stage('Build') {
            steps {
                echo 'Building..'
                bat """
                 cd ${RepoName}
                 docker build -t ${RepoName}:latest .
                 docker tag ${RepoName}:latest itayp/${RepoName}:${NextImageVersion}

                """
            }
        }
        stage('Upload Image To Artifactory') {
            steps {
                echo 'Upload Image To Artifactory..'
                bat """
                 cd ${RepoName}
                 docker logout
                 docker login -u itayp -p Alroe2018
                 docker push itayp/${RepoName}:${NextImageVersion}
                """
            }
        }
        stage('Deploy') {
            steps {
                script {
                    echo 'Deploying....'
                    file = new File("${WORKSPACE}/jenkins-pipeline-kubernates/Deployment.yaml")
                    newConfig = file.text.replace('tmpServiceNameImage', "itayp/${RepoName}:${NextImageVersion}")
                    newConfig = newConfig.replace('tmpServiceName', "${RepoName}")
                    writeFile file:"${WORKSPACE}/jenkins-pipeline-kubernates/Deployment.yaml", text:newConfig

                    file2 = new File("${WORKSPACE}/jenkins-pipeline-kubernates/Ingress.yaml")
                    newConfig2 = file2.text.replace('tmpServiceName', "${RepoName}")

                    writeFile file:"${WORKSPACE}/jenkins-pipeline-kubernates/Ingress.yaml", text:newConfig2

                    // def yaml = readYaml file: 'Deployment.yaml'

                    // yaml.metadata.name = RepoName
                    // yaml.spec.selector.matchLabels.app = RepoName
                    // yaml.spec.template.metadata.labels.app = RepoName
                    // yaml.spec.template.spec.containers.name = RepoName
                    // yaml.spec.template.spec.containers.image = "itayp/${RepoName}:${NextImageVersion}"
                    // writeFile file:"${RepoName}/Deployment.yaml", text:yamlToString(yaml)

                    // def yaml2 = readYaml file: "${RepoName}/Ingress.yaml"
                    // yaml2.metadata.name = RepoName
                    // yaml2.spec.rules[0].host = RepoName - qa.itayp - dev.com
                    // yaml2.spec.rules[0].paths[0].backend.service.name = RepoName
                    // writeFile file:"${RepoName}/Ingress.yaml", text:yamlToString(yaml2)

                    bat """
                    cd jenkins-pipeline-kubernates
                    kubectl --kubeconfig ${KUBECONFIG}  apply -f Deployment.yaml
                    kubectl --kubeconfig ${KUBECONFIG}  apply -f Ingress.yaml
                    """
                }
            }
        }
    }
}
