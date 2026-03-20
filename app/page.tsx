"use client";

import React, { useState, useEffect } from "react";

// Inline icons since lucide-react unavailable
const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

type Question = {
  id: string;
  question: string;
  options: [string, string, string];
  correctOption: number;
};

type MaterialData = {
  title: string;
  subtitle: string;
  summary: string;
  visualLabel: string;
  keyIdeas: string;
  classroomApplications: string;
  tips: string[];
  questions: Question[];
};

const defaultData: MaterialData = {
  title: "",
  subtitle: "",
  summary: "",
  visualLabel: "",
  keyIdeas: "",
  classroomApplications: "",
  tips: [""],
  questions: [
    {
      id: "1",
      question: "",
      options: ["", "", ""],
      correctOption: 0,
    },
  ],
};

const seedData: MaterialData = {
  title: "Future Forms Workshop",
  subtitle: "A detailed breakdown of will, going to, and present continuous for future events.",
  summary: "This workshop is designed to help students discover the subtle differences in English future forms through guided discovery and communicative tasks. Perfect for intermediate students aiming to refine their tense precision.",
  visualLabel: "Grammar & Speaking",
  keyIdeas: "1. Distinguish between plans and spontaneous decisions.\n2. Understand present continuous for fixed arrangements.\n3. Identify timeline keywords.",
  classroomApplications: "Ideal for B1-B2 adult learners. Can be used in a 60-minute session or split across two classes. Works well in group settings.",
  tips: ["Use timelines heavily when introducing the difference between plans.", "Encourage pair work during the final task."],
  questions: [
    {
      id: "1",
      question: "Which form is best for a spontaneous decision?",
      options: ["will", "going to", "present continuous"],
      correctOption: 0,
    },
  ],
};

const heroHighlights = [
  {
    label: "Flow",
    steps: ["Create", "Publish", "Review in Hub"],
    description: "A simple path from drafting the material to checking the finished card inside Teacher Hub.",
  },
  {
    label: "Storage",
    value: "Local browser draft",
    description: "Your progress stays on this device while you refine the structure, summary, and questions.",
  },
  {
    label: "Best for",
    value: "Teacher-made explainers",
    description: "Ideal for methodology notes, teaching summaries, and ready-to-use classroom guidance.",
  },
] as const;

export default function PublisherWorkspace() {
  const [data, setData] = useState<MaterialData>(defaultData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("teacher_publisher_draft");
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        setData(seedData);
      }
    } else {
      setData(seedData);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded && !isPublished) {
      localStorage.setItem("teacher_publisher_draft", JSON.stringify(data));
    }
  }, [data, isLoaded, isPublished]);

  const updateData = (field: keyof MaterialData, value: any) => {
    setData((d) => ({ ...d, [field]: value }));
  };

  const updateTip = (index: number, val: string) => {
    const newTips = [...data.tips];
    newTips[index] = val;
    updateData("tips", newTips);
  };

  const addTip = () => {
    updateData("tips", [...data.tips, ""]);
  };

  const removeTip = (index: number) => {
    const newTips = data.tips.filter((_, i) => i !== index);
    updateData("tips", newTips);
  };

  const updateQuestion = (qIndex: number, field: string, val: any) => {
    const newQuestions = [...data.questions];
    if (field === "question") {
      newQuestions[qIndex].question = val;
    } else if (field.startsWith("option")) {
      const optIndex = parseInt(field.replace("option", ""), 10);
      newQuestions[qIndex].options[optIndex] = val;
    } else if (field === "correctOption") {
      newQuestions[qIndex].correctOption = parseInt(val, 10);
    }
    updateData("questions", newQuestions);
  };

  const addQuestion = () => {
    updateData("questions", [
      ...data.questions,
      { id: Date.now().toString(), question: "", options: ["", "", ""], correctOption: 0 },
    ]);
  };

  const removeQuestion = (index: number) => {
    const newQuestions = data.questions.filter((_, i) => i !== index);
    updateData("questions", newQuestions);
  };

  const handlePublish = () => {
    setIsPublished(true);
    setTimeout(() => {
      alert("Material successfully published to Teacher Hub!");
      setIsPublished(false);
    }, 600);
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-slate-800 dark:text-slate-200 font-sans transition-colors duration-200">
      
      {/* Hero Header */}
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-10">
        <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wide text-indigo-600 dark:text-indigo-400 uppercase bg-indigo-50 dark:bg-indigo-900/30 rounded-full border border-indigo-100 dark:border-indigo-800/50">
          Teacher Publisher
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
          Create a new material
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mb-8 leading-relaxed">
          Fill in the summary, key ideas, classroom applications, tips, and self-check questions below. Once everything looks perfect, publish directly to your Teacher Hub.
        </p>
        
        <div className="grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
          {heroHighlights.map((item) => (
            <article
              key={item.label}
              className="rounded-[28px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] backdrop-blur dark:border-slate-700 dark:bg-slate-800/85 md:p-6"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                {item.label}
              </span>

              {"steps" in item ? (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {item.steps.map((step, index) => (
                    <React.Fragment key={step}>
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700 dark:bg-slate-700/70 dark:text-slate-100">
                        {step}
                      </span>
                      {index < item.steps.length - 1 && (
                        <span className="text-sm text-slate-300 dark:text-slate-600">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-[1.35rem] font-semibold leading-tight tracking-tight text-slate-900 dark:text-white">
                  {item.value}
                </p>
              )}

              <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column - Form */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-slate-700">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Build the content block</h2>
              </div>
              <div className="p-6 space-y-6">
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Visual Label</label>
                    <input
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      placeholder="e.g. Grammar & Speaking"
                      value={data.visualLabel}
                      onChange={(e) => updateData("visualLabel", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Material Title</label>
                    <input
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-lg font-medium"
                      placeholder="Enter title..."
                      value={data.title}
                      onChange={(e) => updateData("title", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Subtitle</label>
                    <input
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      placeholder="Short descriptive subtitle..."
                      value={data.subtitle}
                      onChange={(e) => updateData("subtitle", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Summary</label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                      placeholder="Write a brief overview..."
                      value={data.summary}
                      onChange={(e) => updateData("summary", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Key Ideas</label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                        placeholder="List the main ideas..."
                        value={data.keyIdeas}
                        onChange={(e) => updateData("keyIdeas", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Classroom Applications</label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                        placeholder="How should teachers use this?"
                        value={data.classroomApplications}
                        onChange={(e) => updateData("classroomApplications", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Quick Teaching Tips</label>
                    <button onClick={addTip} className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors">
                      <PlusIcon /> Add Tip
                    </button>
                  </div>
                  <div className="space-y-3">
                    {data.tips.map((tip, idx) => (
                      <div key={idx} className="flex items-center gap-2 group">
                        <input
                          className="flex-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                          placeholder={`Tip ${idx + 1}...`}
                          value={tip}
                          onChange={(e) => updateTip(idx, e.target.value)}
                        />
                        <button
                          onClick={() => removeTip(idx)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Questions Form */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Add quick questions</h2>
                <button
                  onClick={addQuestion}
                  className="px-3 py-1.5 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 rounded-lg flex items-center gap-1 transition-colors"
                >
                  <PlusIcon /> New Question
                </button>
              </div>
              <div className="p-6 space-y-8">
                {data.questions.map((q, idx) => (
                  <div key={q.id} className="relative p-5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 group">
                    <button
                      onClick={() => removeQuestion(idx)}
                      className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <TrashIcon />
                    </button>
                    <div className="mb-4 pr-8">
                      <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Question {idx + 1}</label>
                      <input
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        placeholder="What is..."
                        value={q.question}
                        onChange={(e) => updateQuestion(idx, "question", e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                      {q.options.map((opt, optIdx) => (
                        <div key={optIdx}>
                          <label className="block text-xs font-semibold mb-1 text-slate-500">Option {optIdx + 1}</label>
                          <input
                            className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            placeholder={`Option ${optIdx + 1}`}
                            value={opt}
                            onChange={(e) => updateQuestion(idx, `option${optIdx}`, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-slate-500">Correct Answer</label>
                      <select
                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none"
                        value={q.correctOption}
                        onChange={(e) => updateQuestion(idx, "correctOption", e.target.value)}
                      >
                        {q.options.map((_, optIdx) => (
                          <option key={optIdx} value={optIdx}>Option {optIdx + 1}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
                {data.questions.length === 0 && (
                  <div className="text-center py-8 text-slate-500 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
                    No questions added yet.
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handlePublish}
              disabled={isPublished}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2 ${
                isPublished 
                  ? "bg-green-500 text-white scale-[0.98]" 
                  : "bg-indigo-600 hover:bg-indigo-700 text-white hover:-translate-y-1 hover:shadow-indigo-500/40"
              }`}
            >
              {isPublished ? (
                <>
                  <CheckIcon /> Published successfully!
                </>
              ) : (
                "Publish to Teacher Hub"
              )}
            </button>
          </div>

          {/* Right Column - Live Preview */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-24">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">How it will look in Teacher Hub</h2>
              
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none min-h-[600px] transition-all">
                {/* Preview Card Editorial Header */}
                <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-700">
                  <div className="flex justify-between items-start mb-4">
                    {data.visualLabel ? (
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-xs font-bold uppercase tracking-wider rounded-md">
                        {data.visualLabel}
                      </span>
                    ) : (
                      <div className="h-6 w-24 bg-slate-100 dark:bg-slate-700 rounded-md animate-pulse" />
                    )}
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 dark:bg-slate-900/50 px-2 py-1 rounded-full">
                      <CheckIcon /> Published
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white leading-tight mb-2">
                    {data.title || <span className="text-slate-300 dark:text-slate-600">Untitled Material</span>}
                  </h3>
                  <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
                    {data.subtitle || "No subtitle provided"}
                  </p>
                </div>

                <div className="prose prose-slate dark:prose-invert prose-sm">
                  {data.summary && (
                    <div className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-6 font-serif italic border-l-4 border-indigo-200 dark:border-indigo-800 pl-4">
                      {data.summary}
                    </div>
                  )}

                  {data.keyIdeas && (
                    <div className="mb-6">
                      <h4 className="text-sm font-bold tracking-widest uppercase text-slate-400 mb-3">Key Ideas</h4>
                      <div className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl">
                        {data.keyIdeas}
                      </div>
                    </div>
                  )}

                  {data.classroomApplications && (
                    <div className="mb-6">
                      <h4 className="text-sm font-bold tracking-widest uppercase text-slate-400 mb-3">Applications</h4>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {data.classroomApplications}
                      </p>
                    </div>
                  )}

                  {data.tips.filter(t => t.trim() !== "").length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-bold tracking-widest uppercase text-slate-400 mb-3">Teaching Tips</h4>
                      <ul className="space-y-2">
                        {data.tips.filter(t => t.trim() !== "").map((tip, i) => (
                          <li key={i} className="flex gap-2 text-sm text-slate-700 dark:text-slate-300">
                            <span className="text-indigo-400 mt-0.5"><CheckIcon /></span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {data.questions.length > 0 && data.questions[0].question.trim() !== "" && (
                    <div>
                      <h4 className="text-sm font-bold tracking-widest uppercase text-slate-400 mb-3">Self-Check Quiz</h4>
                      <div className="space-y-4">
                        {data.questions.filter(q => q.question.trim() !== "").map((q, i) => (
                          <div key={i} className="bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/50 rounded-xl p-4">
                            <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm mb-3">
                              {i + 1}. {q.question}
                            </p>
                            <div className="space-y-2">
                              {q.options.filter(o => o.trim() !== "").map((opt, optIdx) => (
                                <div 
                                  key={optIdx} 
                                  className={`px-3 py-2 text-xs rounded-lg border ${
                                    q.correctOption === optIdx 
                                      ? "bg-indigo-100 border-indigo-200 text-indigo-900 dark:bg-indigo-900/40 dark:border-indigo-700 dark:text-indigo-200 font-medium" 
                                      : "bg-white border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"
                                  }`}
                                >
                                  {opt}
                                  {q.correctOption === optIdx && (
                                    <span className="float-right"><CheckIcon /></span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Empty state visual */}
                  {(!data.visualLabel && !data.title && !data.summary && !data.keyIdeas && !data.classroomApplications) && (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full mb-4 animate-pulse"></div>
                      <p className="text-sm">Start typing to build your preview...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
