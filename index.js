/* global fetch */

// Config
const teams = [
  'Keaton',
  'Gavin',
  'Matt',
  'Landon',
  'Harry',
  'Conor',
  'Nick',
  'Chris',
  'Domenic',
  'Joe',
];

const sendDiscordMsg = true;

const webhookUrl = '';

// Function to randomize draft order
const shuffleDraftOrder = (teamArr) => {
  // Loop through array from last to first
  for (let i = teamArr.length - 1; i > 0; i--) {
    // Pick random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    // Swap j and i
    [teamArr[i], teamArr[j]] = [teamArr[j], teamArr[i]];
  }

  return teamArr;
};

// Function to format draft order
const formatDraftOrder = (formattedArr) => {
  return formattedArr.map((team, index) => `${index + 1}. ${team}`).join('\n');
};

// Function to send discord msg
const sendMessage = async (msg, url) => {
  const msgObj = {
    content: '```' + msg + '```',
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(msgObj),
    });

    if (res.status === 204) {
      console.log('Msg sent successfully');
    }
  } catch (err) {
    console.log(err);
  }
};

// Call functions
const shuffledTeams = shuffleDraftOrder(teams);
const formattedTeams = formatDraftOrder(shuffledTeams);

if (sendDiscordMsg && webhookUrl) {
  sendMessage(formattedTeams, webhookUrl);
}
