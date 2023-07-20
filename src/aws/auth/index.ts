import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js'

var poolData = {
  UserPoolId: 'us-east-1_9zUa1V12S',
  ClientId: '61te5c2moaio9tnie1v00d4k81',
}

export const API = {
  signUp(email: string, password: string, fullName: string) {
    var dataPersonalName = {
      Name: 'name',
      Value: fullName,
    }
    var dataEmail = {
      Name: 'email',
      Value: email,
    }

    var userPool = new CognitoUserPool(poolData)
    var attributeEmail = new CognitoUserAttribute(dataEmail)
    var attributePersonalName = new CognitoUserAttribute(dataPersonalName)
    var updatedAt = new CognitoUserAttribute({
      Name: 'updated_at',
      Value: Math.floor(new Date().getTime() / 1000).toString(),
    })
    var attributeList = []
    attributeList.push(attributeEmail)
    attributeList.push(attributePersonalName)
    attributeList.push(updatedAt)
    userPool.signUp(email, password, attributeList, [], function (err, result: any) {
      if (err) {
        console.error(err)
        return err
      }
      var cognitoUser = result.user
      console.log(cognitoUser)
      return cognitoUser
    })
  },
  signIn(email: string, password: string) {
    var authenticationData = {
      Username: email,
      Password: password,
    }
    var authenticationDetails = new AuthenticationDetails(authenticationData)
    var userPool = new CognitoUserPool(poolData)
    var userData = {
      Username: email,
      Pool: userPool,
    }
    var cognitoUser = new CognitoUser(userData)
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result: any) {
        var accessToken = result.getAccessToken().getJwtToken()
        console.log(accessToken)
        return accessToken
      },

      onFailure: function (err: any) {
        console.error(err)
        return err
      },
    })
  }
}
