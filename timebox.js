let dayOptions = {
    timeZone: 'Europe/Paris',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
}
dayFormatter = new Intl.DateTimeFormat([], dayOptions);

let hourOptions = {
    timeZone: 'Europe/Paris',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
}
hourFormatter = new Intl.DateTimeFormat([], hourOptions);

let statuses = {
  idle:"idle",
  offline:"offline",
  online:"online",
  dnd:"dnd"
}

let day = $('#day')
let hour = $('#hour')
let discord = $('#status')
let activity = $('#discord')
let activity1 = $('#activity1')
let activity2 = $('#activity2')
let discordicon = $('#discordicon')
let activities = $('.activities')

async function updatePresence(){
  const res = await fetch('https://api.lanyard.rest/v1/users/290482004435271680')
  await res.json().then((rpc) => {
    discord.text(`${statuses[rpc.data.discord_status]} ${(!localStorage.getItem("presenceTooltip") && rpc.data.activities[0] !== undefined) ? " (click me!)" : ""}`)
    if (rpc.data.activities[0] !== undefined) {

      switch (rpc.data.activities[0].name) {
        case "Visual Studio Code":
          activity1.text(rpc.data.activities[0].details)
          activity2.text(rpc.data.activities[0].state)
          discordicon.css("fill","var(--accent)")
          break;

        case "Spotify":
          activity1.text(`Listening to ${rpc.data.activities[0].state}`)
          activity2.text(rpc.data.activities[0].details)
          discordicon.css("fill","var(--accent)")
          break;

        case "After Effects":
          activity1.text(`Editing in After Effects`)
          activity2.text(`${rpc.data.activities[0].details} (${rpc.data.activities[0].state})`)
          discordicon.css("fill","var(--accent)")
          break;

        case "Premiere Pro":
          activity1.text(`Editing in Premiere Pro`)
          activity2.text(`${rpc.data.activities[0].details} (${rpc.data.activities[0].state})`)
          discordicon.css("fill","var(--accent)")
          break;
          
        default:
          activity1.text(`Playing ${rpc.data.activities[0].name}`)
          discordicon.css("fill","var(--accent)")
          break;

      }

    } else {
    discordicon.css("fill","var(--text)")
    activity1.text(" ")
    activity2.text(" ")
  }
    
    })
}

function showActivity(){
  if (!localStorage.getItem("presenceTooltip")){
    localStorage.setItem("presenceTooltip",true)
  }
  discord.text(discord.text().split(' ')[0])
  activities.toggleClass('hide-activity')
  activities.toggleClass('show-activity')
}


function updateTimebox(){
  if (window.innerWidth < 1450 && commands_printed >= 2){ // Hiding timebox if there is a risk of overlapping with the text
      $('#timebox').addClass('hide-timebox')
      $('#timebox').removeClass('show-timebox')
  } else {
      $('#timebox').removeClass('hide-timebox')
      $('#timebox').addClass('show-timebox')
  }
}


day.text(`${dayFormatter.format(new Date())} at UTC+1`)
hour.text(hourFormatter.format(new Date()))
discord.text("loading")
updatePresence()

setInterval(() => {
    day.text(`${dayFormatter.format(new Date())} at UTC+1`)
    hour.text(hourFormatter.format(new Date()))
}, 1000);


setInterval(() => {
  updatePresence()

}, 10000);


