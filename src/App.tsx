import VideoPlayer from "./components/VideoPlayer";

import video1 from "./videos/1.mp4";
import video2 from "./videos/2.mp4";
import video3 from "./videos/3.mp4";

function App() {
  const videos = [
    {
      title: "Title 1",
      url: video1,
    },
    {
      title: "Title 2",
      url: video2,
    },
    {
      title: "Title 3",
      url: video3,
    },
  ];

  const events = [
    {
      title: "Event 1",
      videoTime: 3,
      videoUrl: video1,
    },
    {
      title: "Event 2",
      videoTime: 5,
      videoUrl: video1,
    },
    {
      title: "Event 3",
      videoTime: 7,
      videoUrl: video1,
    },
    {
      title: "Event 4",
      videoTime: 5,
      videoUrl: video2,
    },
    {
      title: "Event 5",
      videoTime: 10,
      videoUrl: video2,
    },
    {
      title: "Event 6",
      videoTime: 15,
      videoUrl: video2,
    },
    {
      title: "Event 7",
      videoTime: 2,
      videoUrl: video3,
    },
    {
      title: "Event 8",
      videoTime: 4,
      videoUrl: video3,
    },
    {
      title: "Event 9",
      videoTime: 6,
      videoUrl: video3,
    },
  ];

  return (
    <>
      <div className="container">
        <VideoPlayer videos={videos} events={events} />
      </div>
    </>
  );
}

export default App;
