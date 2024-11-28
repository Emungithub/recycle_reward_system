import React from "react";
import "./Leaderboard.css";

function Leaderboard() {
  const data = [
    {
      rank: "#1",
      name: "Ee Mun",
      username: "@eemun",
      nftsEarned: "40",
      ftsEarned: "700",
      totalRecycled: "200",
      submissions: "29",
      nftBadge: ["Green Guardian", "Recycle Hero", "Planet Protector"],
    },
    {
      rank: "#2",
      name: "louis",
      username: "@louis",
      nftsEarned: "30",
      ftsEarned: "500",
      totalRecycled: "150",
      submissions: "20",
      nftBadge: ["Earth Advocate", "Eco Ally", "Plastic Eliminator"],
    },
    {
      rank: "#3",
      name: "Arnavbla",
      username: "@arnavbla",
      nftsEarned: "23",
      ftsEarned: "300",
      totalRecycled: "120",
      submissions: "30",
      nftBadge: ["Carbon Slayer", "Circular Economy Champion", "Zero-Waste Warrior"],
    },
    {
      rank: "#4",
      name: "Pilek",
      username: "@Pilek",
      nftsEarned: "$10",
      ftsEarned: "200",
      totalRecycled: "100",
      submissions: "20",
      nftBadge: ["Ocean Defender", "Forest Friend", "Rain Recycler"],
    },
    {
      rank: "#5",
      name: "Kumar",
      username: "@kumar",
      nftsEarned: "98",
      ftsEarned: "170",
      totalRecycled: "90",
      submissions: "22",
      nftBadge: ["Sustainability Superhero", "Trash Transformer", "Biodiversity Builder"],
    },
    {
      rank: "#6",
      name: "JKumar",
      username: "@Jkumar",
      nftsEarned: "70",
      ftsEarned: "100",
      totalRecycled: "90",
      submissions: "10",
      nftBadge: ["Planet Saver", "Compost Crusader", "Green Innovator"],
    },
  ];

  return (

    <div className="leaderboard-container">

      <h1 className="leaderboard-title">Recycle Reward Leaderboard</h1>
      <table className="leaderboard">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Total Recycled(kg)</th>
            <th>NTFs Earned</th>
            <th>FTs Earned</th>
            <th>Submissions</th>
            <th>NFTs collections</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.rank}</td>
              <td>
                <div className="user-info">
                  <span className="user-avatar">{row.name[0]}</span>
                  <div className="user-details">
                    <div>{row.name}</div>
                    <small>{row.username}</small>
                  </div>
                </div>
              </td>
              <td>{row.totalRecycled}</td>
              <td>{row.nftsEarned}</td>
              <td>{row.ftsEarned}</td>
              <td>{row.submissions}</td>
              <td>
                <div className="nftskills">
                  {row.nftBadge.map((nftskill, i) => (
                    <span key={i} className="nft-badge">
                      {nftskill}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
