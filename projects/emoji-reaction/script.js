'use strict';

const commentInput = document.getElementById('commentInput');
const addCommentBtn = document.getElementById('addCommentBtn');
const commentsList = document.getElementById('commentsList');

function setupComment(commentEl) {
  const reactToggleBtn = commentEl.querySelector('.react-toggle');
  const reactionBar = commentEl.querySelector('.reaction-bar');
  const reactionSummary = commentEl.querySelector('.reaction-summary');

  if (!reactToggleBtn || !reactionBar || !reactionSummary) return;

  reactToggleBtn.addEventListener('click', () => {
    const isVisible = reactionBar.style.display === 'flex';
    reactionBar.style.display = isVisible ? 'none' : 'flex';
  });

  reactionBar.addEventListener('click', (event) => {
    const button = event.target.closest('.reaction-btn');
    if (!button) return;

    const emoji = button.dataset.emoji;
    if (!emoji) return;

    handleReactionClick(commentEl, reactionSummary, emoji);
  });
}

function handleReactionClick(commentEl, summaryEl, emoji) {
  const existingChip = Array.from(summaryEl.children).find(
    (chip) => chip.dataset.emoji === emoji
  );

  if (existingChip) {
    existingChip.remove();
  } else {
    const chip = document.createElement('div');
    chip.classList.add('reaction-chip');
    chip.dataset.emoji = emoji;

    const emojiSpan = document.createElement('span');
    emojiSpan.textContent = emoji;

    const countSpan = document.createElement('span');
    countSpan.classList.add('reaction-count');
    countSpan.textContent = '1';

    chip.appendChild(emojiSpan);
    chip.appendChild(countSpan);
    summaryEl.appendChild(chip);
  }

  if (summaryEl.children.length > 0) {
    commentEl.classList.add('has-reactions');
  } else {
    commentEl.classList.remove('has-reactions');
  }
}

function createCommentElement(text) {
  const li = document.createElement('li');
  li.classList.add('comment');

  const authorName = 'You';
  const avatarLetter = authorName.charAt(0).toUpperCase();

  li.innerHTML = `
    <div class="comment-avatar">${avatarLetter}</div>
    <div class="comment-content">
      <div class="comment-header">
        <span class="comment-author">${authorName}</span>
        <span class="comment-time">Just now</span>
      </div>
      <p class="comment-text"></p>

      <div class="comment-footer">
        <button class="react-toggle" type="button">React</button>

        <div class="reaction-bar">
          <button class="reaction-btn" data-emoji="👍" type="button">👍</button>
          <button class="reaction-btn" data-emoji="❤️" type="button">❤️</button>
          <button class="reaction-btn" data-emoji="😂" type="button">😂</button>
          <button class="reaction-btn" data-emoji="😮" type="button">😮</button>
          <button class="reaction-btn" data-emoji="😢" type="button">😢</button>
        </div>

        <div class="reaction-summary"></div>
      </div>
    </div>
  `;

  const textEl = li.querySelector('.comment-text');
  textEl.textContent = text;

  const reactionBar = li.querySelector('.reaction-bar');
  reactionBar.style.display = 'none';

  setupComment(li);

  return li;
}

function handleAddComment() {
  const rawText = commentInput.value.trim();
  if (!rawText) return;

  const newComment = createCommentElement(rawText);
  commentsList.appendChild(newComment);

  commentInput.value = '';
  commentInput.focus();
}

document.querySelectorAll('.comment').forEach((commentEl) => {
  const reactionBar = commentEl.querySelector('.reaction-bar');
  if (reactionBar) {
    reactionBar.style.display = 'none';
  }
  setupComment(commentEl);
});

addCommentBtn.addEventListener('click', handleAddComment);
