import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
const app = express();
const main = express();

main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended: false}));

export const webApi = functions.https.onRequest(main);

app.post('/oauth2/authorize', async (request, response) => {
  try {
    const {code} = request.body;
    response.json({
      token: code,
      userId: 666,
      roleName: "ADMIN",
    });
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get('/evaluations/:id', async (request, response) => {
  try {
    // @ts-ignore
    const evaluationId = request.params.id;

    if (!evaluationId) throw new Error('evaluationId is required');

    const evaluation = await db.collection('evaluations').doc(evaluationId).get();
    if (!evaluation.exists) {
      throw new Error('Evaluation doesnt exist.')
    }
    response.json(evaluation.data());
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get('/evaluations', async (request, response) => {
  try {
    const evaluationsSnapshot = await db.collection('evaluations').get();
    const evaluations: any[] = [];
    evaluationsSnapshot.forEach(
      (doc) => {
        evaluations.push(doc.data());
      }
    );
    const data = {
      data: evaluations
    };
    response.json(data);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post('/evaluations/:id/answers', async (request, response) => {
  try {
    const {IdEvaluation} = request.body;
    // @ts-ignore
    const evaluationId = request.params.id;
    response.json({
      "IdEvaluation": IdEvaluation,
      "evaluationId": evaluationId
    });
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get('/notifications', async (request, response) => {
  try {
    const notificationsSnapshot = await db.collection('notifications').get();
    const notifications: any[] = [];
    notificationsSnapshot.forEach(
      (doc) => {
        notifications.push(doc.data());
      }
    );
    const data = {
      data: notifications
    };
    response.json(data);
  } catch (error) {
    response.status(500).send(error);
  }
});
