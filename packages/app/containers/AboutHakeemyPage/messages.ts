/*
 * AboutHakeemyPage Messages
 *
 * This contains all the text for the AboutHakeemyPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AboutHakeemyPage';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'ABOUT HAKEEMY'
  },
  aboutHakeemy: {
    id: `${scope}.aboutHakeemy`,
    defaultMessage:
      'Hakeemy platform specializes in searching for doctors and medical facilities and managing appointments, and in our attempts to improve medical care in our region and around the world we have developed Hakeemy website and smart device applications to be the most effective method of research and speed of access to doctors, and because your health is important to your family and loved ones and their health is also important to you The best way to tell is when selecting a doctor, checking, and knowing other options. Hakeemy does not nominate a visitor to visit a specific hospital or doctor, but we leave this for your evaluation.'
  }
});
