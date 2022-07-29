#!/usr/bin/env groovy
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
                            choice(name:'NeedUpgradePC', choices:['yes', 'no'], description: 'Do you need upgrade your PC'),
                            [$class: 'DynamicReferenceParameter',
                                    choiceType: 'ET_FORMATTED_HTML',
                                    omitValueField: true,
                                    description: 'Please provide a Elastic alias label',
                                    name: 'PC_RAM',
                                    randomName: 'choice-parameter-5631314456178624',
                                    referencedParameters: 'NeedUpgradePC',
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
                                            if(NeedUpgradePC.equals('yes')) {
                                                inputBox="<input name='value' type='text' value='Kingston 8GB'>"
                                            } else {
                                                inputBox="<input name='value' type='text' value='Kingston 8GB' disabled>"
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
                                            randomName: 'choice-parameter-5631314456178625',
                                            referencedParameters: 'NeedUpgradePC',
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

                        try{
    //                 def http = new URL('https://api.github.com/user/repos?visibility=private').openConnection() as HttpURLConnection
    //                 http.setRequestMethod('GET')
    //                 http.setDoOutput(true)
    //                 http.setRequestProperty('Accept', 'application/json')
    //                 http.setRequestProperty('Authorization', 'token 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')
    //                       http.outputStream.write(body.getBytes('UTF-8'))
    //                 http.connect()

    //                 def response = [:]
    //                                if (http.responseCode == 200) {
    //                                             response = new JsonSlurper().parseText(http.inputStream.getText('UTF-8'))
    //                                         } else {
    //                                             response = new JsonSlurper().parseText(http.errorStream.getText('UTF-8'))
    //                                         }
    // // return "<input name='value' type='text' value='Intel Core i5'>" //[response.toString()]
    //                                             inputBox="<input name='value' type='text' value='Intel Corssssssssssse i5'>"
                           inputBox="<input name='value' type='text' value="dddd">"

                        }catch(Throwable t){
                            def ppp = t.toString()
                           inputBox="<input name='value' type='text' value=$ppp>"

                        }

                                                //                                         // if (http.responseCode == 200) {
                                                //                                         //     response = new JsonSlurper().parseText(http.inputStream.getText('UTF-8'))
                                                //                                         // } else {
                                                //                                         //     response = new JsonSlurper().parseText(http.errorStream.getText('UTF-8'))
                                                //                                         // }
                                                // def popo = "dddd"
                                                    // inputBox="<input name='value' type='text' value=popo>"

                                        // if(NeedUpgradePC.equals('yes')) {
                                        // inputBox="<input name='value' type='text' value='Intel Core i5'>"
                                        // } else {
                                        // inputBox="<input name='value' type='text' value='Intel Core i5' disabled>"
                                        // }
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
