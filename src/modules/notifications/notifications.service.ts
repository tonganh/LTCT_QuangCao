import { Injectable } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import { HandleError } from '../../common/error.response';
import { configFirebase } from '../../config/firebase.config';
import * as OneSignal from 'onesignal-node'
import { SendNotificatinWithOneSignal } from './dto/req.dto';
@Injectable()
export class NotificationsService {
    constructor() {
        firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert({
                privateKey: configFirebase.private_key,
                clientEmail: configFirebase.client_email,
                projectId: configFirebase.project_id,
            }),
        });
    }

    async sendWithOneSignal(req: SendNotificatinWithOneSignal) {
        try {
            const client = new OneSignal.Client('31665b22-ba2a-4491-8ebe-77509553ed47', 'MDM5ZGE3NDYtYmY4Mi00YjA0LTk4OTItZDkxZjQ4MjM5Yjky')
            const { content, title } = req
            const notification = {
                contents: {
                    'vn': content,
                    'en': content,
                },
                included_segments: ['Subscribed Users'],
                headings: { "en": title }
            };
            await client.createNotification(notification);
            return 1
        } catch (error) {
            HandleError(error)
        }
    }


    async sendNotification() {
        try {

            const registrationToken = 'djMffqC-3oyuVC0wqkDmEk:APA91bFQHFygf5c0twIX1z6tZvgv53bz6kYkYpi_mIm2M35po55kCYw5o6tSwNgcco5gTNDgpD6pSDTTi6ukKMeGdJWiurPn2nzSZgnU106wew-eVnwJit5fUlnONv_XeTDwEVQIrW7w';

            // See the "Defining the message payload" section above for details
            // on how to define a message payload.
            const payload = {
                notification: {
                    title: 'Urgent action needed!',
                    body: 'Urgent action is needed to prevent your account from being disabled!'
                }
            };

            // Set the message as high priority and have it expire after 24 hours.
            const options = {
                priority: 'high',
                timeToLive: 60 * 60 * 24
            };

            // Send a message to the device corresponding to the provided
            // registration token with the provided options.
            await firebaseAdmin.messaging().sendToDevice(registrationToken, payload, options)

            return 1

        } catch (error) {
            HandleError(error);
        }
    }
}
