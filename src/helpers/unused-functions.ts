


// async function sendPushNotification(expoPushToken: any) {
//  console.log('expo push token', expoPushToken)
//  let expoToken
//  await registerForPushNotificationsAsync().then((token: any) => (expoToken = token))
//  console.log('expo token', expoToken)
//  const message = {
//    to: expoPushToken,
//    title: 'Original Title',
//    body: 'And here is the body!',
//  }

//  await fetch('https://api.expo.dev/v2/push/send', {
//    method: 'POST',
//    headers: {
//      Accept: 'application/json',
//      'Content-Type': 'application/json',
//    },
//    body: JSON.stringify([
//      {
//        to: 'ExponentPushToken[U8Y2Y5JkJVOCw-5KEGp2qB]',
//        title: 'Personalised Plan is Ready 🎉!',
//        body: 'Your new requested workout and meal plan is ready.',
//      },
//    ]),
//  })
//}
