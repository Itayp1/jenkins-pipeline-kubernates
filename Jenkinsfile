#!/usr/bin/env groovy
/* groovylint-disable LineLength */
/* groovylint-disable-next-line CompileStatic */
import groovy.json.JsonSlurper

// import groovy.yaml.YamlSlurper
//requirments
// pipeline utility steps
pipeline {
    agent any
    environment {
        GIT_REPO_TOKEN     = credentials('jenkinsRepo')
        DOCKER_HUB_TOKEN = credentials('DOCKER_HUB_TOKEN')
        KUBECONFIG = credentials('KUBECONFIG')
        X_AUTH_KEY = credentials('X_AUTH_KEY')
        DOCKERHUB_USER = credentials('DOCKERHUB_USER')
        DOCKERHUB_PASSWORD = credentials('DOCKERHUB_PASSWORD')
        KUBERNATES_CLUSTER_IP = credentials('KUBERNATES_CLUSTER_IP')
    }
    stages {
        stage('Setup parameters') {
            steps {
                script {
                    properties([

                        parameters([

                               [$class: 'CascadeChoiceParameter',
                                choiceType: 'PT_MULTI_SELECT',
                                description: 'Select the Repo Name from the Dropdown List',
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
                                        response .each { it->
                                            if(it.name.contains("k8s")){
                                            resArr.push(it.name)
                                            }
                                        }
                                        return resArr
                                     } catch (Exception e) {
                                          return [e.toString()]
                                     }
                                            """
                                    ]
                                ]
                    ],

                             choice(
                                name: 'OPERATION',
                                choices: ['Build', 'Deploy']
                            ),
                            choice(
                                name: 'ENV',
                                choices: ['qa', 'prd']
                            ),
                         [$class: 'DynamicReferenceParameter',
                                choiceType: 'ET_FORMATTED_HIDDEN_HTML',
                                description: 'get the last version from artifactory',
                                filterLength: 1,
                                filterable: true,
                                name: 'currentimage',
                                randomName: 'choice-parameter-1231314439613946',
                                referencedParameters: 'RepoName,OPERATION',
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
                        def message = '{"password":"${DOCKERHUB_PASSWORD}","username":"${DOCKERHUB_USER}"}'

                         def setDnsRecordHttp = new URL('https://hub.docker.com//v2/users/login'  ).openConnection() as HttpURLConnection
                        setDnsRecordHttp.setRequestMethod('POST')
                        setDnsRecordHttp.setDoOutput(true)
                        setDnsRecordHttp.setRequestProperty('Content-Type', 'application/json')
                        setDnsRecordHttp.getOutputStream().write(message.getBytes('UTF-8'))
                        setDnsRecordHttp.connect()
                        def setDnsRecordHttpResponse = [:]
                         setDnsRecordHttpResponse = new JsonSlurper().parseText(setDnsRecordHttp.inputStream.getText('UTF-8'))
                         def tmpToken = setDnsRecordHttpResponse.token

                                                                def http = new URL("https://hub.docker.com/v2/repositories/itayp/"+RepoName+"/tags?page_size=100").openConnection() as HttpURLConnection
                                                                http.setRequestMethod('GET')
                                                                http.setDoOutput(true)
                                                                http.setRequestProperty('Authorization', 'JWT '+tmpToken)
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
                                                        nextversion = 0
                                                        }

                                          return '<input name="value" value="' +nextversion+ '" type="text" >'

                                     } catch (Exception e) {
                                          return '<input name="value" value="' +e.toString()+ '" type="text" >'

                                     }
                                            """
                                    ]
                                ]
                    ],
                            [$class: 'DynamicReferenceParameter',
                                    choiceType: 'ET_FORMATTED_HIDDEN_HTML',
                                    omitValueField: true,
                                    description: 'show the last version of the image',
                                    name: 'NextImageVersion',
                                    randomName: 'choice-parameter-5631314456178621',
                                    referencedParameters: 'currentimage, RepoName , OPERATION',
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
                                                    script:'''
                                                     def nextVer = ""
                                                    if(OPERATION =="Deploy"){
                                                        nextVer=Integer.parseInt(currentimage)
                                                    }else{
                                                        nextVer=Integer.parseInt(currentimage)+1

                                                    }

                                                         return '<input name="value" value="' +nextVer+ '" type="text" >'

                                '''
                                            ]
                                    ]
                            ],
                            [$class: 'DynamicReferenceParameter',
                                    choiceType: 'ET_FORMATTED_HTML',
                                    omitValueField: true,
                                    description: 'the next version of the image',
                                    name: 'NextImageVersionHtml',
                                    randomName: 'choice-parameter-5631314456178141',
                                    referencedParameters: 'NextImageVersion,RepoName',
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
                                                    script:'''
                                                  return "<p>$NextImageVersion<p>"
                                '''
                                            ]
                                    ]
                            ],
                            [$class: 'DynamicReferenceParameter',
                                    choiceType: 'ET_FORMATTED_HTML',
                                    omitValueField: true,
                                    description: 'the next version of the image',
                                    name: 'currentImageVersionHtml',
                                    randomName: 'choice-parameter-5631317286178141',
                                    referencedParameters: 'currentimage,RepoName',
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
                                                    script:'''
                                                  return "<p>$currentimage<p>"
                                '''
                                            ]
                                    ]
                            ]
                                    ])
                    ])
                }
            }
        }

        stage('Clean WorkSpace') {
            steps {
                cleanWs()
            }
        }

        stage('Clone Repo') {
            when {
                    expression { params.OPERATION == 'Build' }
            }
            steps {
                echo 'Cloning The Repo..'
                sh "git clone https://itayp1:${GIT_REPO_TOKEN}@github.com/Itayp1/${RepoName}.git"

                echo "params:${params}"
                echo "env:${env}"
            }
        }

        stage('Build') {
                when {
                    expression { params.OPERATION == 'Build' }
                }
            steps {
                echo 'Building..'
                sh """
                 cd ${RepoName}
                 sudo docker build -t ${RepoName}:latest .
                 sudo docker tag ${RepoName}:latest itayp/${RepoName}:${NextImageVersion}

                """
            }
        }
        stage('Upload Image To Artifactory') {
                when {
                    expression { params.OPERATION == 'Build' }
                }
            steps {
                echo 'Upload Image To Artifactory..'
                sh """
                 cd ${RepoName}
                 sudo docker logout
                 sudo docker login -u itayp -p Alroe2018
                 sudo docker push itayp/${RepoName}:${NextImageVersion}
                """
            }
        }
        stage('Deploy') {
            steps {
                script {
                    echo 'Deploying....'
                    sh "git clone https://itayp1:${GIT_REPO_TOKEN}@github.com/Itayp1/jenkins-pipeline-kubernates.git"
                    def repoConfig = readYaml file: "${WORKSPACE}/jenkins-pipeline-kubernates/gen.deploy.yaml"
                    if (repoConfig.projects[RepoName] != null && repoConfig.projects[RepoName].scaleUp == true) {
                        println('repo config with scale up change default setting')
                        def deployment = readYaml file: "${WORKSPACE}/jenkins-pipeline-kubernates/Deployment.yaml"
                        deployment.spec.template.spec.containers[0].resources = repoConfig.projects[RepoName].resources
                        if (repoConfig.projects[RepoName].maxReplicas != null) {
                            def horizontalPodAutoscaler = readYaml file: "${WORKSPACE}/jenkins-pipeline-kubernates/HorizontalPodAutoscaler.yaml"
                            horizontalPodAutoscaler.spec.maxReplicas = repoConfig.projects[RepoName].maxReplicas
                            writeYaml file: "${WORKSPACE}/jenkins-pipeline-kubernates/HorizontalPodAutoscaler.yaml", data:horizontalPodAutoscaler ,overwrite:true
                        }
                        writeYaml file: "${WORKSPACE}/jenkins-pipeline-kubernates/Deployment.yaml", data:deployment ,overwrite:true
                    }
                    file = new File("${WORKSPACE}/jenkins-pipeline-kubernates/Deployment.yaml")
                    newConfig = file.text.replace('tmpServiceNameImage', "itayp/${RepoName}:${NextImageVersion}")
                    newConfig = newConfig.replace('tmpServiceName', "${RepoName}")
                    newConfig = newConfig.replace('ENV_VALUE', "${ENV}")
                    writeFile file:"${WORKSPACE}/jenkins-pipeline-kubernates/Deployment.yaml", text:newConfig

                    file2 = new File("${WORKSPACE}/jenkins-pipeline-kubernates/Ingress.yaml")
                    newConfig2 = file2.text.replace('tmpServiceName', "${RepoName}")
                    writeFile file:"${WORKSPACE}/jenkins-pipeline-kubernates/Ingress.yaml", text:newConfig2

                    serviceDeployment = new File("${WORKSPACE}/jenkins-pipeline-kubernates/Service.yaml")
                    serviceDeploymentChanged = serviceDeployment.text.replace('tmpServiceName', "${RepoName}")
                    writeFile file:"${WORKSPACE}/jenkins-pipeline-kubernates/Service.yaml", text:serviceDeploymentChanged

                    horizontalPodAutoscaler = new File("${WORKSPACE}/jenkins-pipeline-kubernates/HorizontalPodAutoscaler.yaml")
                    horizontalPodAutoscalerChanged = horizontalPodAutoscaler.text.replace('tmpServiceName', "${RepoName}")
                    writeFile file:"${WORKSPACE}/jenkins-pipeline-kubernates/HorizontalPodAutoscaler.yaml", text:horizontalPodAutoscalerChanged

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

                    sh """
                    cd jenkins-pipeline-kubernates
                    kubectl --kubeconfig ${KUBECONFIG}  apply -f qa-config-map.yaml
                    kubectl --kubeconfig ${KUBECONFIG}  apply -f Deployment.yaml
                    kubectl --kubeconfig ${KUBECONFIG}  apply -f HorizontalPodAutoscaler.yaml
                    kubectl --kubeconfig ${KUBECONFIG}  apply -f Service.yaml
                    kubectl --kubeconfig ${KUBECONFIG}  apply -f Ingress.yaml
                    """
                }
            }
        }

        stage('Add DNS Record') {
            steps {
                script {
                        echo 'Add DNS Record'
                    def dnsRecord = ''
                        if (ENV != 'prd') {
                        dnsRecord = "${RepoName}-${ENV}"
                        }else {
                        dnsRecord = RepoName
                        }

                        def dnsListhttp = new URL('https://api.cloudflare.com/client/v4/zones/e613f0a60bf64d0df5e08a0274f2c948/dns_records?name=' + dnsRecord + '.digital-cloud-services.com'  ).openConnection() as HttpURLConnection
                        dnsListhttp.setRequestMethod('GET')
                        dnsListhttp.setDoOutput(true)
                        dnsListhttp.setRequestProperty('X-Auth-Email', 'peretz.itay@gmail.com')
                        dnsListhttp.setRequestProperty('X-Auth-Key', X_AUTH_KEY)
                        dnsListhttp.connect()
                        def dnsListResponse = [:]
                        if (dnsListhttp.responseCode == 200) {
                        dnsListResponse = new JsonSlurper().parseText(dnsListhttp.inputStream.getText('UTF-8'))
                        } else {
                        dnsListResponse = new JsonSlurper().parseText(dnsListhttp.errorStream.getText('UTF-8'))
                        }
                        println(dnsListResponse)
                        def dnsRecordExist = dnsListResponse.result_info.count > 0

                        if (dnsRecordExist) {
                        echo 'the dns record already exist do nothing'
                        return
                            }else {
                        echo 'create new dns'
                        }

                        def message = '{"type": "A","name": "'+dnsRecord+'","content":"'+ KUBERNATES_CLUSTER_IP +'","proxied": true}'

                        def setDnsRecordHttp = new URL('https://api.cloudflare.com/client/v4/zones/e613f0a60bf64d0df5e08a0274f2c948/dns_records'  ).openConnection() as HttpURLConnection
                        setDnsRecordHttp.setRequestMethod('POST')
                        setDnsRecordHttp.setDoOutput(true)
                        setDnsRecordHttp.setRequestProperty('X-Auth-Email', 'peretz.itay@gmail.com')
                        setDnsRecordHttp.setRequestProperty('X-Auth-Key', X_AUTH_KEY)
                        setDnsRecordHttp.setRequestProperty('Content-Type', 'application/json')
                        setDnsRecordHttp.getOutputStream().write(message.getBytes('UTF-8'))
                        setDnsRecordHttp.connect()
                        def setDnsRecordHttpResponse = [:]
                        if (setDnsRecordHttp.responseCode == 200) {
                        echo 'finish add dns record'
                        setDnsRecordHttpResponse = new JsonSlurper().parseText(setDnsRecordHttp.inputStream.getText('UTF-8'))
                        } else {
                        setDnsRecordHttpResponse = new JsonSlurper().parseText(setDnsRecordHttp.errorStream.getText('UTF-8'))
                        println(setDnsRecordHttpResponse)
                        throw new Exception('could not update dns record')
                        }
                }
            }
        }
    }
}
