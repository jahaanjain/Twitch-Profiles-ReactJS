import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import logo from './logo.svg';
import './App.css';

function App() {

  async function getChatter(channel, username) {
    try {
      let url = encodeURI(`https://private.api/${channel}/${username}/`);
      let res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Profiles'
        }
      });
        let json = await res.json();
        let wCheck;
        if (json.message === 'No logs found') { return setResponse("Unable to get user information!"); }
        const count1 = json.messages.reduce((acc, m) => (m.text.includes('AYAYA') || m.text.includes('cute') ? (acc += 1) : acc), 0);
        const count2 = json.messages.reduce((acc, m) => (m.text.includes('NaM') || m.text.includes('WeebsOut') ? (acc += 1) : acc), 0);
        const count3 = json.messages.reduce((acc, m) => (m.text.includes('just') || m.text.includes('4H') ? (acc += 1) : acc), 0);
        const count4 = json.messages.reduce((acc, m) => m.text.includes('WeirdChamp') || m.text.includes('FeelsWeirdMan') ? (acc += 1) : acc, 0);
        const count5 = json.messages.reduce((acc, m) => (m.text.includes('5Head') || m.text.includes('ah yes') ? (acc += 1) : acc), 0);
        const count6 = json.messages.reduce((acc, m) => (m.text.includes('gachi') || m.text.includes('HandsUp') ? (acc += 1) : acc), 0);
        const count7 = json.messages.reduce((acc, m) => (m.text.includes('TriHard') || m.text.includes('WideHard') ? (acc += 1) : acc), 0);

        let counts = [ count1, count2, count3, count4, count5, count6, count7 ];
        let maxcount = Math.max.apply(Math.max, counts);
        let countnames = [ 'weebcount', 'namcount', '4headcount', 'weirdcount', 'moxycount', 'gachicount', 'homiecount' ];
        let maxCountF = countnames[counts.indexOf(maxcount)];
        let countpercent = maxcount / 10;
        if (maxcount == 0) { return setResponse(`User ${username} is a nobody with no identity... FeelsBadMan`); }
        if (maxCountF === `weebcount`) { wCheck = `User ${username} is a weeb with a score of ${countpercent}! 🍷 TehePelo  `; }
        if (maxCountF === `namcount`) { wCheck = `User ${username} is a nammer with a score of ${countpercent}! FeelsGoodMan FBBlock PunOko  `; }
        if (maxCountF === `4headcount`) { wCheck = `User ${username} is JUST a 4Head with JUST a score of ${countpercent}! `; }
        if (maxCountF === `weirdcount`) { wCheck = `User ${username} is a Weird-Wendy with a score of ${countpercent}! :| :| :| `; }
        if (maxCountF === `moxycount`) { wCheck = `User ${username} is a Moxxer with a score of ${countpercent}! 🍷 5Head  `; }
        if (maxCountF === `gachicount`) { wCheck = `User ${username} is a gachi friend with a score of ${countpercent}! HandsUp gachiHYPER `; }
        if (maxCountF === `homiecount`) { wCheck = `User ${username} is a homie with a score of ${countpercent}! MY MAN TriHard 7 `; }
        console.log(response, username)
        return setResponse(wCheck);
    } catch (error) { console.error(error); return setResponse("Unable to get user information!"); }
  }

  const [channel, setChannel] = useState('xqcow');
  const [username, setUsername] = useState('roaringiron');
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(0);
  const [response, setResponse] = useState('');

  useEffect(() => {
    getChatter(channel, username);
    console.log('running function')
  }, [query]);

  const updateChannel = e => {
    setChannel(e.target.value);
  }
  const updateUsername = e => {
    setUsername(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(Math.random());
  }

  return (
      <div className="App">
        <form className="search-form" onSubmit={getSearch}>
          <input className="search-bar" type="text" value={channel} onChange={updateChannel}/>
          <input className="search-bar" type="text" value={username} onChange={updateUsername}/>
          <button className="search-button" type="submit"> Search </button>
        </form>
        <Profile username={username} type={response}/>
      </div>
  );
}

export default App;
