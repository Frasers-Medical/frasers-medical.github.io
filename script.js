var selOpt = ["uni", "topic", "subTop"];
var opts = [
  ["ANU", "Bond", "Curtin", "Deakin", "Flinders", "Griffith", "JCU", "Macquarie", "Monash", "Newcastle", "UNDF/UNDS", "Adelaide", "Melbourne", "Sydney",
  "Wollongong", "Western Australia", "Western Sydney", "UQ"],
  ["Personal", "Medical School", "Public Health", "Rural Health", "Indigenous Health", "Medical Ethics", 
    "Teamwork", "Cultural Respect", "Decision Making", "Communication", "University Specifics", 
    "Emotional Scenarios", "Acting Stations", "Practical Skills", "Detach", "Video Stations", 
    "Portfolio Stations", "Picture Stations", "Cultural Awareness"],
  ["Motivation", "Strengths and Weaknesses", "Experience", "Structure", "Resource Allocation", "Opinion", "Confidentiality", "Autonomy", "Justice", 
    "Conflict", "Heirarchy", "Empathy", "Bad News", "Infographic", "Approach to Problem", 
    "Detach", 
    "Explaining Reasoning", "Exploring Motivations", "Understanding Issue", "Displaying Empathy",
    "Conflict Resolution", "Problem Solving", "Self Care", "Self Awareness", "Leadership",
    "Risk Assessment", "Beneficence", "Non-Maleficence"]];

function startDropdowns() {
  var sel;
  for (var i = 0; i < selOpt.length; i++) {
    sel = document.getElementById(selOpt[i]);
    removeOptions(sel, 0);
    var el = document.createElement("option");
    el.textContent = "All";
    el.value = "ANY";
    sel.appendChild(el);
    if (i == 0) {
      populateOptions(sel, opts[i]);
    }
    //eliminateEmpty(0);
  }
  eliminateEmpty(0);
  var x = document.getElementById("contentDiv");
  if (x.style.display != "none") {
    x.style.display = "none";
  }
}

function removeOptions(selectBox, min) {
  var i;
  for (i = selectBox.options.length - 1; i >= min; i--) {
    selectBox.remove(i);
  }
}

function populateOptions(selectBox, array) {
  var opt;
  var el;
  for (var i = 0; i < array.length; i++) {
    opt = array[i];
    el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    selectBox.appendChild(el);
  }

}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function eliminateEmpty(index) {
  var list = json;
  var catDex = -1;

  var gTopics;
  var topics;
  var sel;

  var uniFilter = document.getElementById(selOpt[0]).value;
  var topicFilter = document.getElementById(selOpt[1]).value;
  if (index == 1) {
    if (topicFilter != "ANY") {
      list = list.filter(a => a.Category == topicFilter);
    }
  }
  if (uniFilter != "ANY") {
    list = list.filter(a => a.University == uniFilter);
  }

  for (var i = index + 1; i < selOpt.length; i++) {
    gTopics = Array.from(opts[i]);
    topics = Array.from(opts[i]);
    list.forEach(a => {
      if (i == 1) {
        catDex = topics.indexOf(a.Category);
        if (catDex > -1) {
          topics.splice(catDex, 1);
        }
      } else {
        catDex = topics.indexOf(a.Subcategory1);
        if (catDex > -1) {
          topics.splice(catDex, 1);
        }
        catDex = topics.indexOf(a.Subcategory2);
        if (catDex > -1) {
          topics.splice(catDex, 1);
        }
      }
    });
    topics.forEach(a => {
      catDex = gTopics.indexOf(a);
      gTopics.splice(catDex, 1);
    });
    sel = document.getElementById(selOpt[i]);
    sel.selectedIndex = 0;
    removeOptions(sel, 1);
    populateOptions(sel, gTopics);
  }
}



function getStation() {
  var list = json;
  var uniFilter = document.getElementById("uni").value;
  var topicFilter = document.getElementById("topic").value;
  var subFilter = document.getElementById("subTop").value;

  if (uniFilter != "ANY") {
    list = list.filter(a => a.University == uniFilter);
  }
  if (topicFilter != "ANY") {
    list = list.filter(a => a.Category == topicFilter);
  }
  if (subFilter != "ANY") {
    list = list.filter(a => {
      if ((a.Subcategory1 == subFilter) || (a.Subcategory2 == subFilter)) {
        return true;
      }
      return false;
    });

  }

  var x = document.getElementById("contentDiv");
  if (x.style.display === "none") {
    x.style.display = "block";
  }
  if (list.length == 0) {
    document.getElementById("error").innerHTML = "No results. Please select a different combination";
    document.getElementById("station").innerHTML = "";
    document.getElementById("1").innerHTML = "";
    document.getElementById("2").innerHTML = "";
    document.getElementById("3").innerHTML = "";
    document.getElementById("4").innerHTML = "";
  } else {
    station = list[getRandomInt(list.length - 1)];
    document.getElementById("error").innerHTML = "";
    document.getElementById("station").innerHTML = station.Station;
    document.getElementById("1").innerHTML = station.FollowUp1;
    document.getElementById("2").innerHTML = station.FollowUp2;
    document.getElementById("3").innerHTML = station.FollowUp3;
    document.getElementById("4").innerHTML = station.FollowUp4;

  }
  //reset();

  // Updating localStorage
  let currentTimes = localStorage.getItem('times')
  if (currentTimes){
    localStorage.setItem('times', parseInt(currentTimes) + 1)
  }
  else {
    localStorage.setItem('times', 1)
  }

}

function reset() {
  document.getElementById("error").innerHTML = "";
  document.getElementById("station").innerHTML = "";
  document.getElementById("1").innerHTML = "";
  document.getElementById("2").innerHTML = "";
  document.getElementById("3").innerHTML = "";
  document.getElementById("4").innerHTML = "";
  document.getElementById("uni").selectedIndex = 0;
  startDropdowns();
}

startDropdowns();

// Adding a lead-gen modal 

$(function() {
  // Loading AC form into Modal 
  $.get('Testing.html', (data)=> {
    console.log('Found html')
  })

  $('#modal-body').load("Testing.html")

  $('#subscribe-btn').on('click', function() {
    console.log('click...')
  })

  if(!localStorage.getItem('shownModal')) {
    var popped = false
    var handle = setInterval(function() {
      if (!popped) {
        if (localStorage.getItem('times') === "5") {
          // Open modal
          $('#openModal_btn').click()
          localStorage.setItem('shownModal', true)
          popped = true
          clearInterval(handle)
        }
      }
    }, 3000)
  }
}
)









