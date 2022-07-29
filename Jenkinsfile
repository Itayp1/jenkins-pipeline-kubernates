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

                          return ['dfdf']
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
