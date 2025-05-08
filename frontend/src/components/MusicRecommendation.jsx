import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import BACKEND_URL from "../config";

function MusicRecommendation({ handleLogout }) {
  const webcamRef = useRef(null);
  const [mood, setMood] = useState(null);
  const [loading, setLoading] = useState(false);
  const [optionSelected, setOptionSelected] = useState(null);

  const logout = async () => {
    try {
      await signOut(auth);
      handleLogout(); // This updates the parent App state
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const moodPlaylists = {
    angry: [
      {
        name: "Apna Time Aayega - Gully Boy",
        audio:
          "../../songs/angry/Apna Time Aayega _ Gully Boy _ Ranveer Singh & Alia Bhatt _ DIVINE _ Dub Sharma _ Zoya Akhtar.mp3",
      },
      {
        name: "Azadi - Gully Boy",
        audio:
          "../../songs/angry/Azadi - Gully Boy_ Ranveer Singh & Alia Bhatt _ DIVINE _ Dub Sharma _ Siddhant _ Zoya Akhtar.mp3",
      },
      {
        name: "Challa (Main Lad Jaana) - URI",
        audio:
          "../../songs/angry/Challa (Main Lad Jaana) - URI _ Vicky Kaushal , Yami Gautam _ Shashwat S _ Romy , Vivek _ Kumaar.mp3",
      },
      {
        name: "Dus Bahane Karke Le Gaye Dil - Dus",
        audio:
          "../../songs/angry/Dus Bahane Karke Le Gaye Dil _ Dus _ Zayed K, Abhishek B _ K K, Shaan _ Vishal Dadlani, Shekhar.mp3",
      },
      {
        name: "Get Ready To Fight Full Video Song - BAAGHI",
        audio:
          "../../songs/angry/Get Ready To Fight Full Video Song _ BAAGHI _ Tiger Shroff, Grandmaster Shifuji _ Benny Dayal.mp3",
      },
      {
        name: "Kar Har Maidaan Fateh Lyrical - Sanju",
        audio:
          "../../songs/angry/Kar Har Maidaan Fateh Lyrical _ Sanju _ Ranbir Kapoor _ Rajkumar Hirani _ Sukhwinder Singh _ Shreya.mp3",
      },
      {
        name: "Lakshya Audio Song Full Song - Title Track",
        audio:
          "../../songs/angry/Lakshya Audio Song Full Song - Title Track_Hrithik Roshan_Shankar Ehsaan Loy_Javed Akhtar.mp3",
      },
      {
        name: "Lyrical _ Sadda Haq Video Song _ Rockstar",
        audio:
          "../../songs/angry/Lyrical _ Sadda Haq Video Song  _ Rockstar _ Ranbir Kapoor _ Mohit Chauhan _ A.R. Rahman.mp3",
      },
      {
        name: "Piyush Mishra _Aarambh_ Lyrical Video Song - Gulaal",
        audio:
          "../../songs/angry/Piyush Mishra _Aarambh_ Lyrical Video Song _ Gulaal _ K. K. Menon, Abhimannyu Singh, Mahi Gill.mp3",
      },
      {
        name: "Zinda Lyrical Video - Bhaag Milkha Bhaag",
        audio:
          "../../songs/angry/Zinda Lyric Video - Bhaag Milkha Bhaag_Farhan Akhtar_Siddharth Mahadevan_Prasoon Joshi.mp3",
      },
    ],
    disgust: [
      {
        name: "Bandeyaa - Jazbaa",
        audio:
          "../../songs/disgust/Bandeyaa - Jazbaa _ Full Song _  Aishwarya Rai Bachchan & Irrfan _ Jubin _ Amjad - Nadeem.mp3",
      },
      {
        name: "Bhaag D.K. Bose, Aandhi Aayi - Delhi Belly",
        audio:
          "../../songs/disgust/Bhaag D.K. Bose, Aandhi Aayi _ Ram Sampath _ Imraan Khan,Vir Das,Kunal Roy Kapur _ Delhi Belly.mp3",
      },
      {
        name: "Channa Mereya - Ae Dil Hai Mushkil",
        audio:
          "../../songs/disgust/Channa Mereya - Lyric Video _ Ae Dil Hai Mushkil _ Karan Johar _ Ranbir _ Anushka _ Pritam _ Arijit.mp3",
      },
      {
        name: "Jee Karda - Badlapur",
        audio:
          "../../songs/disgust/Jee Karda (Official Full Song) _ Badlapur _ Varun Dhawan & Yami Gautam.mp3",
      },
      {
        name: "Jag Soona Soona Lage - Om Shanti Om",
        audio:
          "../../songs/disgust/Lyrical_ Jag Soona Soona Lage _ Om Shanti Om _ Shahrukh Khan, Deepika Padukon.mp3",
      },
      {
        name: "Move On - Tanu Weds Manu Returns",
        audio:
          "../../songs/disgust/Move On (Official Video Song) _ Tanu Weds Manu Returns _ Kangana Ranaut & R Madhavan.mp3",
      },
      {
        name: "Nadaan Parindey - Rockstar",
        audio:
          "../../songs/disgust/ROCKSTAR_ Nadaan Parinde (Full Song) _ Ranbir Kapoor _ A. R. Rahman _ Mohit Chauhan _ Irshaad Kamil.mp3",
      },
      {
        name: "छोड़ दो आंचल ज़माना - Chhod Do Aanchal Zamana",
        audio:
          "../../songs/disgust/छोड़ दो आँचल ज़माना - Chhod Do Aanchal Zamana -  HD वीडियो सोंग - आशा भोंसले, किशोर कुमार.mp3",
      },
    ],
    fear: [
      {
        name: "Khoon Chala - Rang De Basanti",
        audio:
          "../../songs/fear/A.R. Rahman - Khoon Chala Best Video_Rang De Basanti_Aamir Khan_Siddharth_Mohit Chauhan.mp3",
      },
      {
        name: "Phir Le Aya Dil (Reprise) - Barfi",
        audio:
          "../../songs/fear/Barfi - Phir le aya dil (Reprise)- Arijit singh Full song.wmv.mp3",
      },
      {
        name: "Tu Kuja - Highway",
        audio:
          "../../songs/fear/Highway Tu Kuja Full Lyrical Song _ A.R Rahman _ Alia Bhatt, Randeep Hooda.mp3",
      },
      {
        name: "Jee Le Zaraa - Talaash",
        audio:
          "../../songs/fear/Lyrical _ Jee Le Zaraa Song _ Talaash  _ Aamir Khan, Rani Mukherjee, Kareena Kapoor (1).mp3",
      },
      {
        name: "Aaoge Jab Tum - Jab We Met",
        audio:
          "../../songs/fear/Lyrical_ Aaoge Jab Tum _ Jab We Met _ Kareena  Kapoor, Shahid Kapoor _ Ustad Rashid Khan.mp3",
      },
      {
        name: "Aankhon Ke Saagar - Shafqat Amanat Ali",
        audio:
          "../../songs/fear/Shafqat Amanat Ali - Aankhon Ke Saagar - High Quality - With Lyrics.mp3",
      },
    ],
    happy: [
      {
        name: "Gallan Goodiyan - Dil Dhadakne Do",
        audio:
          "../../songs/happy/_Gallan Goodiyaan_ Full Song (Audio) _ Dil Dhadakne Do _ T-Series.mp3",
      },
      {
        name: "Abhi Toh Party Shuru Hui Hai - Khoobsurat",
        audio:
          "../../songs/happy/Abhi Toh Party Shuru Hui Hai - Full Song _ Badshah, Aastha _ OFFICIAL VIDEO.mp3",
      },
      {
        name: "Badtameez Dil - Yeh Jawaani Hai Deewani",
        audio:
          "../../songs/happy/Badtameez Dil Yeh Jawaani Hai Deewani Full Song Feat. Ranbir Kapoor, Deepika Padukone _ PRITAM.mp3",
      },
      {
        name: "Kala Chashma - Baar Baar Dekho",
        audio:
          "../../songs/happy/Kala Chashma - Full Video_ Baar Baar Dekho_ Sidharth Katrina _ Prem Hardeep Kam Badshah Neha Indeep.mp3",
      },
      {
        name: "London Thumakda - Queen",
        audio:
          "../../songs/happy/Queen_ London Thumakda Full Video Song _ Kangana Ranaut, Raj Kumar Rao.mp3",
      },
      {
        name: "The Breakup Song - Ae Dil Hai Mushkil",
        audio:
          "../../songs/happy/The Breakup Song - Ae Dil Hai Mushkil _  Latest Official Song 2016 _ Pritam _ Arijit I Badshah.mp3",
      },
      {
        name: "Zingaat - Dhadak",
        audio:
          "../../songs/happy/Zingaat Hindi _ Dhadak _ Ishaan & Janhvi _ Ajay-Atul _ Amitabh Bhattacharya.mp3",
      },
    ],
    neutral: [
      {
        name: "Hasi Ban Gaye - Hamari Adhuri Kahani",
        audio:
          "../../songs/neutral/Hasi Ban Gaye (Lyrical Video) Male Version _ Emraan Hashmi, Vidya Balan _ Ami Mishra _ Mohit Suri.mp3",
      },
      {
        name: "Ilahi - Yeh Jawaani Hai Deewani",
        audio:
          "../../songs/neutral/Ilahi Mera Jee Aaye - Yeh Jawaani Hai Deewani (2013).mp3",
      },
      {
        name: "Khairiyat - Chhichhore",
        audio: "../../songs/neutral/Khairiyat.mp3",
      },
      {
        name: "Tera Ban Jaunga - Kabir Singh",
        audio:
          "../../songs/neutral/LYRICAL_ Tera Ban Jaunga _ Kabir Singh _ Shahid K, Kiara A, Sandeep V _ Tulsi Kumar, Akhil Sachdeva.mp3",
      },
      {
        name: "Raabta - Agent Vinod",
        audio:
          "../../songs/neutral/Raabta (Kehte Hain Khuda Ne) _ Agent Vinod _ Shreya Ghoshal, Arijit Singh Lyrics AVS.mp3",
      },
      {
        name: "Phir Se Ud Chala - Rockstar",
        audio:
          "../../songs/neutral/ROCKSTAR_ Phir Se Ud Chala (Full Song) _ Ranbir Kapoor, Nargis Fakhri _ A. R. Rahman, Mohit Chauhan.mp3",
      },
      {
        name: "Tum Se Hi - Jab We Met",
        audio:
          "../../songs/neutral/Tum Se Hi Lyrcial _ Jab We Met _ Kareena Kapoor, Shahid Kapoor _ Mohit Chauhan _ Pritam.mp3",
      },
    ],
    sad: [
      {
        name: "Agar Tum Saath Ho - Tamasha",
        audio: "../../songs/sad/AGAR TUM SAATH HO.mp3",
      },
      {
        name: "Channa Mereya - Ae Dil Hai Mushkil",
        audio:
          "../../songs/sad/Channa Mereya - Lyric Video _ Ae Dil Hai Mushkil _ Karan Johar _ Ranbir _ Anushka _ Pritam _ Arijit.mp3",
      },
      {
        name: "Tera Yaar Hoon Main - Sonu Ke Titu Ki Sweety",
        audio:
          "../../songs/sad/Full Video_ Tera Yaar Hoon Main _ Sonu Ke Titu Ki Sweety _ Arijit Singh Rochak Kohli _ Song 2018.mp3",
      },
      {
        name: "Jaane Nahin Denge Tujhe - 3 Idiots",
        audio:
          "../../songs/sad/Jaane Nahin Denge Tujhe - Lyrical _ 3 Idiots _ Aamir Khan, Kareena K, Madhavan, Sharman J_Sonu Nigam.mp3",
      },
      {
        name: "Kun Faya Kun - Rockstar",
        audio:
          "../../songs/sad/Lyrical _ Kun Faya Kun Video Song _  Rockstar _ Ranbir Kapoor _  A.R. Rahman.mp3",
      },
      {
        name: "Phir Le Aya Dil - Barfi!",
        audio:
          "../../songs/sad/Phir Le Aya Dil - Redux - Barfi_Pritam_Arijit Singh_Ranbir_Priyanka_Ileana D_Cruz.mp3",
      },
      {
        name: "Tum Hi Ho - Aashiqui 2",
        audio:
          "../../songs/sad/Tum Hi Ho Aashiqui 2 Full Video Song _ Aditya Roy Kapur, Shraddha Kapoor.mp3",
      },
    ],
    surprise: [
      {
        name: "Chaiyya Chaiyya - Dil Se",
        audio:
          "../../songs/surprise/Chaiyya Chaiyya Full Lyrical Video _ Dil Se _ Melody Maker - A.R Rahman.mp3",
      },
      {
        name: "Ghagra - Yeh Jawaani Hai Deewani",
        audio:
          "../../songs/surprise/Ghagra - Yeh Jawaani Hai Deewani _ Madhuri Dixit, Ranbir Kapoor, Deepika Padukone.mp3",
      },
      {
        name: "Jai Jai Shivshankar - WAR",
        audio:
          "../../songs/surprise/Jai Jai Shivshankar Song _ WAR _ Hrithik Roshan, Tiger Shroff, Benny Dayal, Vishal & Shekhar, Kumaar.mp3",
      },
      {
        name: "Aankh Marey - SIMMBA",
        audio:
          "../../songs/surprise/SIMMBA_ Aankh Marey Lyrical _ Ranveer Singh, Sara Ali Khan _ Tanishk Bagchi, Mika Singh,Neha,Kumar S.mp3",
      },
      {
        name: "Urvashi Urvashi - Hum Se Hai Muqabla",
        audio:
          "../../songs/surprise/Urvashi Urvashi _ Hum Se Hai Muqabala _ Prabhu Deva _ A.R.Rahman.mp3",
      },
      {
        name: "Zoobi Doobi - 3 Idiots",
        audio:
          "../../songs/surprise/Zoobi Doobi - 3 Idiots _ Aamir Khan & Kareena Kapoor_ Sonu Nigam,Shreya Ghoshal_Shantanu M,Swanand K.mp3",
      },
    ],
  };

  const healthTips = {
    angry: [
      "Try mindfulness exercises or go for a walk to cool down.",
      "Practice deep breathing techniques to release anger.",
      "Channel your energy into physical activity like exercise.",
    ],
    disgust: [
      "Step away from what's bothering you and engage in calming activities.",
      "Practice acceptance and try to shift your focus to positive things.",
      "Talk to someone about your feelings to gain a new perspective.",
    ],
    fear: [
      "Face your fears gradually and don't hesitate to seek help.",
      "Practice grounding techniques like 5-4-3-2-1 sensory awareness.",
      "Engage in calming hobbies like reading, art, or meditation.",
    ],
    happy: [
      "Keep smiling! Spread positivity and enjoy the little moments.",
      "Maintain gratitude by writing down things you're thankful for.",
      "Celebrate your wins, even the small ones.",
    ],
    neutral: [
      "Maintain a healthy balance of work, rest, and hobbies.",
      "Stay hydrated and follow a regular sleep schedule.",
      "Engage in activities that uplift you, even if you feel okay.",
    ],
    sad: [
      "Take a deep breath and talk to someone you trust. You're not alone.",
      "Engage in activities you usually enjoy, even if you don't feel like it.",
      "Practice self-compassion and allow yourself to rest.",
    ],
    surprise: [
      "Adapt to surprises positively and keep an open mind.",
      "Turn unexpected events into learning opportunities.",
      "Maintain flexibility in your daily life to handle surprises smoothly.",
    ],
  };

  const captureAndDetectMood = async () => {
    if (!webcamRef.current) return;

    setLoading(true);
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      alert("Failed to capture image");
      setLoading(false);
      return;
    }

    const base64Image = imageSrc.split(",")[1];

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/recognize`,
        { image: base64Image },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.mood) {
        setMood(response.data.mood);
      }
    } catch (error) {
      console.error("Error detecting mood:", error);
      alert("Mood detection failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    setOptionSelected(null);
  };

  return (
    <div className="container-Music">
      <h1 className="title">Mood Detection Hub</h1>
      <button onClick={logout} className="btn logout-btn">
        Logout
      </button>

      <div className="content">
        {/* Left Section */}
        <div className="left-section">
          <h2 className="section-title">Facial Recognition</h2>
          <div className="webcam-container">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="webcam flip-horizontal"
            />
          </div>
          <button
            onClick={captureAndDetectMood}
            disabled={loading}
            className="detect-btn"
          >
            {loading ? "Detecting..." : "Detect Mood"}
          </button>
          {mood && (
            <p className="mood-text">
              Detected Mood: <span>{mood}</span>
            </p>
          )}
        </div>

        {/* Right Section */}
        <div className="right-section">
          {mood && !optionSelected ? (
            <div className="options-container">
              <button
                className="option-btn"
                onClick={() => setOptionSelected("playlist")}
              >
                Vibe with a Playlist 🎵
              </button>
              <button
                className="option-btn"
                onClick={() => setOptionSelected("healthTips")}
              >
                Lifestyle Recommendations 💪
              </button>
            </div>
          ) : optionSelected === "playlist" ? (
            <div>
              <h2 className="section-title">Recommended Playlist</h2>
              {moodPlaylists[mood] ? (
                <ul className="playlist">
                  {/* //////////////////////////////// */}
                  {moodPlaylists["surprise"].map((song, index) => (
                    <li key={index} className="playlist-item">
                      <span>{song.name}</span>
                      <audio controls src={song.audio} className="audio-player">
                        Your browser does not support the audio element.
                      </audio>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-songs">No playlist available for your mood!</p>
              )}
              <button onClick={handleGoBack} className="go-back-btn">
                Go Back
              </button>
            </div>
          ) : optionSelected === "healthTips" ? (
            <div>
              <h2 className="section-title">Lifestyle Recommendations</h2>
              {healthTips[mood] ? (
                <ul className="health-tips-list">
                  {healthTips[mood].map((tip, index) => (
                    <li key={index} className="health-tip-item">
                      {tip}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-tips">
                  No health tips available for your mood!
                </p>
              )}
              <button onClick={handleGoBack} className="go-back-btn">
                Go Back
              </button>
            </div>
          ) : (
            <p className="no-options">Detect a mood to see options!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MusicRecommendation;
