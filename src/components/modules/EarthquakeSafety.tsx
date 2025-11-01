import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, Play, Pause, Maximize, CheckCircle, 
  XCircle, Trophy, RefreshCw, Video
} from 'lucide-react';

interface EarthquakeSafetyProps {
  onBack: () => void;            // back to modules/dashboard
  onBackToStudents: () => void;  // back to students card
}

interface VideoData {
  id: number;
  title: string;
  transcript: string;
  src: string;
}

interface QuizData {
  id: number;
  video: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const EarthquakeSafety: React.FC<EarthquakeSafetyProps> = ({ onBack, onBackToStudents }) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showFeedback, setShowFeedback] = useState<{ [key: number]: boolean }>({});
  const [showResults, setShowResults] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videos: VideoData[] = [
    { id: 1, title: "What is a Disaster?", transcript: "A disaster is a sudden event causing significant damage or loss. It can be natural like floods, earthquakes, or hurricanes, or man-made. Awareness helps in preparation.", src: "/videos/earthquake-safety-video-1 - Made with Clipchamp.mp4" },
    { id: 2, title: "What is an Earthquake & How to Prepare", transcript: "An earthquake is the shaking of the ground caused by tectonic movements. Preparation includes securing heavy furniture, having emergency kits, and planning safe spots.", src: "/videos/what is an earthquake.mp4" },
    { id: 3, title: "What to Do During an Earthquake", transcript: "During an earthquake, drop, cover, and hold on. Protect your head and neck and stay away from windows and heavy furniture.", src: "/videos/During the earthquake.mp4" },
    { id: 4, title: "What to Do After an Earthquake", transcript: "After an earthquake, check for injuries, hazards, and follow emergency instructions. Avoid damaged buildings until authorities declare them safe.", src: "/videos/During the earthquake.mp4" }
  ];

  const quiz: QuizData[] = [
    // Video 1
    { id: 0, video: 1, question: "What is a disaster?", options: ["A planned event","Sudden harmful event","Holiday","Party"], correct: 1, explanation: "A disaster is a sudden harmful event causing loss or damage." },
    { id: 1, video: 1, question: "Example of natural disaster?", options: ["Earthquake","Computer crash","Birthday","Traffic jam"], correct: 0, explanation: "Earthquakes are natural disasters caused by tectonic movements." },
    { id: 2, video: 1, question: "Can disasters be man-made?", options: ["Yes","No","Sometimes","Rarely"], correct: 0, explanation: "Yes, disasters can also be man-made like chemical spills or fires." },
    { id: 3, video: 1, question: "Awareness helps with?", options: ["Preparation","Ignoring","Procrastination","Confusion"], correct: 0, explanation: "Awareness allows proper preparation and response." },
    { id: 4, video: 1, question: "Which is not a disaster?", options: ["Flood","Hurricane","Concert","Earthquake"], correct: 2, explanation: "A concert is an event, not a disaster." },
    // Video 2
    { id: 5, video: 2, question: "What causes an earthquake?", options: ["Tectonic movements","Heavy rain","Volcanoes","Thunder"], correct: 0, explanation: "Earthquakes are caused by movements in the Earth's tectonic plates." },
    { id: 6, video: 2, question: "One way to prepare?", options: ["Secure heavy furniture","Throw things around","Ignore warnings","Leave windows open"], correct: 0, explanation: "Securing furniture prevents injuries during shaking." },
    { id: 7, video: 2, question: "Emergency kit includes?", options: ["Water, food, first aid","Toys","Shoes","Books"], correct: 0, explanation: "Emergency kits should include water, food, first aid supplies, and essentials." },
    { id: 8, video: 2, question: "Safe spots in home?", options: ["Near windows","Under sturdy furniture","Kitchen stove","Elevators"], correct: 1, explanation: "Under sturdy furniture protects from falling debris." },
    { id: 9, video: 2, question: "Preparation helps to?", options: ["Reduce injuries","Cause panic","Worsen damage","Do nothing"], correct: 0, explanation: "Preparation reduces injuries and improves safety." },
    // Video 3
    { id: 10, video: 3, question: "During an earthquake you should?", options: ["Run outside","Drop, Cover, Hold On","Call friends","Stand in doorway"], correct: 1, explanation: "Drop, Cover, and Hold On protects you from falling objects." },
    { id: 11, video: 3, question: "After an earthquake, first step?", options: ["Check injuries","Go shopping","Play outside","Sleep"], correct: 0, explanation: "Check yourself and others for injuries and hazards." },
    { id: 12, video: 3, question: "Avoid damaged buildings until?", options: ["Morning","Authorities declare safe","Next week","Never"], correct: 1, explanation: "Only enter buildings after authorities declare them safe." },
    { id: 13, video: 3, question: "Protect mainly?", options: ["Legs","Head and neck","Shoes","Hands"], correct: 1, explanation: "Head and neck are most vulnerable during earthquakes." },
    { id: 14, video: 3, question: "Aftershocks are?", options: ["Smaller earthquakes","Loud noises","Tornadoes","Floods"], correct: 0, explanation: "Aftershocks are smaller earthquakes following the main one." },
    // Video 4
    { id: 15, video: 4, question: "After an earthquake, first check?", options: ["Damage to home","Friends","Weather","News"], correct: 0, explanation: "Check your home for damage and hazards." },
    { id: 16, video: 4, question: "Do not enter buildings until?", options: ["Next morning","Authorities say safe","Next week","Never"], correct: 1, explanation: "Enter buildings only after authorities declare safe." },
    { id: 17, video: 4, question: "Aftershocks may occur?", options: ["Yes","No","Rarely","Never"], correct: 0, explanation: "Aftershocks may continue for days after main quake." },
    { id: 18, video: 4, question: "Family meeting point should be?", options: ["Inside home","Open area","Neighbor's basement","Car"], correct: 1, explanation: "Choose a safe open area away from hazards." },
    { id: 19, video: 4, question: "Water storage per person?", options: ["1 bottle","1 gallon/day for 3 days","5 gallons total","Not necessary"], correct: 1, explanation: "Store 1 gallon per person per day for at least 3 days." }
  ];

  const handleVideoPlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleFullscreen = () => {
    if (videoRef.current && videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: optionIndex });
    setShowFeedback({ ...showFeedback, [questionId]: true });
  };

  const handleNextQuestion = () => {
    if (selectedVideo) {
      const videoQuestions = quiz.filter(q => q.video === selectedVideo.id);
      if (currentQuestion < videoQuestions.length - 1) setCurrentQuestion(currentQuestion + 1);
      else setShowResults(true);
    }
  };

  const handleRestartQuiz = () => {
    setSelectedAnswers({});
    setShowFeedback({});
    setShowResults(false);
    setCurrentQuestion(0);
  };

  const score = selectedVideo ? quiz.filter(q => q.video === selectedVideo.id && selectedAnswers[q.id] === q.correct).length : 0;
  const totalQuestions = selectedVideo ? quiz.filter(q => q.video === selectedVideo.id).length : 0;
  const percentage = totalQuestions ? (score / totalQuestions) * 100 : 0;

  if (!selectedVideo) {
    // Video selection screen
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map(video => (
          <Card key={video.id} className="shadow-elegant border-2 border-sky-blue/30 cursor-pointer hover:shadow-lg transition" onClick={() => { setSelectedVideo(video); setCurrentQuestion(0); setShowResults(false); }}>
            <CardHeader className="bg-sky-blue text-white">
              <CardTitle className="flex items-center"><Video className="w-5 h-5 mr-2" /> {video.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-700 text-sm">{video.transcript.substring(0, 80)}...</div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Selected video detail screen
  const videoQuestions = quiz.filter(q => q.video === selectedVideo.id);
  const currentQ = videoQuestions[currentQuestion];

  return (
    <div className="space-y-6">
      <Card className="shadow-glow border-2 border-bright-purple/30">
        <CardHeader className="bg-gradient-to-r from-bright-purple to-bright-orange text-white">
          <CardTitle className="flex items-center justify-between">
            <span>{selectedVideo.title}</span>
            <div className="flex space-x-2">
              <Button onClick={() => setSelectedVideo(null)} size="sm" variant="ghost" className="text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Videos
              </Button>
              <Button onClick={onBackToStudents} size="sm" variant="ghost" className="text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Students
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Video player and transcript */}
      <Card className="shadow-elegant border-2 border-sky-blue/30">
        <CardHeader className="bg-sky-blue text-white">
          <CardTitle className="flex items-center"><Video className="w-5 h-5 mr-2" /> {selectedVideo.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-black rounded-lg overflow-hidden">
            <video ref={videoRef} className="w-full aspect-video" src={selectedVideo.src} controls={false} />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex justify-between">
              <Button onClick={handleVideoPlay} size="sm" className="bg-white/20 hover:bg-white/30 text-white backdrop-blur">
                {isPlaying ? <><Pause className="w-4 h-4 mr-2"/> Pause</> : <><Play className="w-4 h-4 mr-2"/> Play</>}
              </Button>
              <Button onClick={handleFullscreen} size="sm" className="bg-white/20 hover:bg-white/30 text-white backdrop-blur">
                <Maximize className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gray-100 rounded-lg text-gray-800">{selectedVideo.transcript}</div>
        </CardContent>
      </Card>

      {/* Quiz section */}
      <Card className="shadow-glow border-2 border-bright-orange/30">
        <CardHeader className="bg-gradient-to-r from-bright-orange to-sunny-yellow text-white">
          <CardTitle>📝 Quiz on {selectedVideo.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {!showResults ? (
            <>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Question {currentQuestion+1} of {videoQuestions.length}</span>
                  <Badge className="bg-sky-blue text-white">Video {selectedVideo.id}</Badge>
                </div>
                <Progress value={((currentQuestion+1)/videoQuestions.length)*100} className="h-2" />
              </div>

              <h3 className="text-lg font-semibold mb-4">{currentQ.question}</h3>
              <div className="space-y-3">
                {currentQ.options.map((opt,i) => {
                  const isSelected = selectedAnswers[currentQ.id] === i;
                  const showThisFeedback = showFeedback[currentQ.id];
                  const isCorrect = i === currentQ.correct;
                  return (
                    <Button key={i} onClick={() => handleAnswerSelect(currentQ.id,i)} disabled={showThisFeedback}
                      className={`w-full justify-start text-left p-4 h-auto ${
                        !showThisFeedback ? 'bg-white hover:bg-muted border-2 border-muted text-foreground' :
                        isSelected && isCorrect ? 'bg-bright-green/20 border-2 border-bright-green text-foreground' :
                        isSelected && !isCorrect ? 'bg-coral-red/20 border-2 border-coral-red text-foreground' :
                        !isSelected && isCorrect ? 'bg-bright-green/10 border-2 border-bright-green/50 text-foreground' :
                        'bg-white border-2 border-muted text-foreground opacity-50'
                      }`}
                    >
                      <span className="flex items-center justify-between w-full">
                        <span>{opt}</span>
                        {showThisFeedback && (
                          <>
                            {isSelected && isCorrect && <CheckCircle className="w-5 h-5 text-bright-green" />}
                            {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-coral-red" />}
                            {!isSelected && isCorrect && <CheckCircle className="w-5 h-5 text-bright-green" />}
                          </>
                        )}
                      </span>
                    </Button>
                  );
                })}
              </div>

              {showFeedback[currentQ.id] && (
                <div className={`p-4 rounded-lg ${selectedAnswers[currentQ.id]===currentQ.correct?'bg-bright-green/10 border border-bright-green':'bg-coral-red/10 border border-coral-red'}`}>
                  <p className="text-sm"><span className="font-semibold">{selectedAnswers[currentQ.id]===currentQ.correct?'✅ Correct! ':'❌ Not quite. '}</span>{currentQ.explanation}</p>
                </div>
              )}

              <div className="flex justify-between mt-6">
                <Button onClick={() => setCurrentQuestion(Math.max(0,currentQuestion-1))} disabled={currentQuestion===0} variant="outline">Previous</Button>
                <Button onClick={() => { 
                  if (currentQuestion < videoQuestions.length-1) {
                    setCurrentQuestion(currentQuestion+1);
                  } else {
                    setShowResults(true);
                  }
                }} disabled={!showFeedback[currentQ.id]} className="bg-bright-purple hover:bg-bright-purple/80 text-white">Next</Button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-6xl font-bold mb-2 text-bright-purple icon-pulse">{score}/{videoQuestions.length}</div>
              <Progress value={percentage} className="mb-6 h-4" />
              <Badge className={`text-lg px-4 py-2 ${percentage>=80?'bg-bright-green text-white':percentage>=60?'bg-sunny-yellow text-black':'bg-coral-red text-white'}`}>
                {percentage>=80?'Excellent!':percentage>=60?'Good Job!':'Keep Practicing!'}
              </Badge>
              <Button onClick={handleRestartQuiz} className="bg-bright-purple hover:bg-bright-purple/80 text-white mt-4"><RefreshCw className="w-4 h-4 mr-2"/> Try Again</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EarthquakeSafety;



