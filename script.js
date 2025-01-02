// script.js

const OPENAI_API_KEY = 'sk-...GHIA'; // Your API key here

// 1. Image Gallery & Collage Tool
const uploader = document.getElementById('image-uploader');
const galleryPreview = document.getElementById('gallery-preview');
const canvas = document.getElementById('collage-canvas');
const ctx = canvas.getContext('2d');

uploader.addEventListener('change', () => {
  galleryPreview.innerHTML = '';
  const files = Array.from(uploader.files);

  files.forEach((file) => {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    galleryPreview.appendChild(img);
  });
});

document.getElementById('create-collage-btn').addEventListener('click', () => {
  const images = galleryPreview.querySelectorAll('img');
  canvas.width = 500;
  canvas.height = 500;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  images.forEach((img, i) => {
    const x = (i % 2) * 250; // Arrange in a grid
    const y = Math.floor(i / 2) * 250;
    ctx.drawImage(img, x, y, 250, 250);
  });

  canvas.style.display = 'block';
});

document.getElementById('set-background-btn').addEventListener('click', () => {
  document.body.style.backgroundImage = `url(${canvas.toDataURL()})`;
});

// 2. AI Chat Integration
document.getElementById('send-chat-btn').addEventListener('click', async () => {
  const input = document.getElementById('chat-input').value.trim();
  const log = document.getElementById('chat-log');
  log.innerHTML += `<div><strong>You:</strong> ${input}</div>`;

  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      prompt: input,
      max_tokens: 150,
    }),
  });

  const data = await response.json();
  const reply = data.choices[0].text.trim();
  log.innerHTML += `<div><strong>AI:</strong> ${reply}</div>`;
});

// 3. Job Search Integration (Zippia Example)
document.getElementById('job-search-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('job-title').value;
  const location = document.getElementById('location').value;

  const response = await fetch('https://api.zippia.com/jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ searchTitle: title, searchLocation: location }),
  });

  const jobs = await response.json();
  document.getElementById('job-results').innerHTML = jobs.jobs
    .map((job) => `<div>${job.jobTitle} at ${job.companyName}</div>`)
    .join('');
});
