import AuthService from '../services/AuthService.js';
import PostService from '../services/PostService.js';

document.addEventListener('DOMContentLoaded', () => {
    const postContainer = document.getElementById('posts-container');
    const composeUserinfo = document.getElementById('composer-user-info');
    const logoutBtn = document.getElementById('logout-btn');

    const initFeed = () => {
        const user = AuthService.getUser();

        if (!user) return;

        composeUserinfo.innerHTML = `
            <img class="avatar" src="https://ui-avatars.com/api/?name=${user.email}&background=4F46E5&color=fff" alt="Profile">
            <div class="composer-trigger" id="open-post-modal">
                ¿Qué estás pensando, ${user.email.split('@')[0]}?
            </div>
        `;

        logoutBtn.addEventListener('click', () => {
            AuthService.logout();
            window.location.href = 'login.html'
        });

        loadPosts();

    };

    const loadPosts = async () => {
        const user = AuthService.getUser();

        try {
            const posts = await PostService.getAll();

            postContainer.innerHTML = posts.length ? '' : "<p> No hay posts aún</p>"

            posts.forEach(post => {
                const postEl = document.createElement('div');
                postEl.className = 'post-card fade-in';
                postEl.innerHTML = `
                    <div class="post-header">
                        <img class="avatar" src="https://ui-avatars.com/api/?name=${post.authorName || 'Usuario'}&background=random"
                            alt="Avatar">
                        <div class="post-user-info">
                            <h3>${post.authorName || 'Usuario'}</h3>
                            <span>${post.createdAt || 'Hace un momento'}</span>
                        </div>
                    </div>
                    <div class="post-content">
                        <div class="post-title">${post.title}</div>
                        <p>${post.content}</p>
                    </div>
                    <div class="post-actions">
                        <button class="action-btn"><i class="far fa-thumbs-up"></i> Me gusta</button>
                        <button class="action-btn comment-trigger"><i class="far fa-comment"></i> Comentar</button>
                    </div>
                    <div class="comments-section" id="comments-${post.id}">
                        ${post.comments ? post.comments.map(c => `
                        <div class="comment">
                            <img class="avatar" style="width: 32px; height: 32px;"
                                src="https://ui-avatars.com/api/?name=${c.authorName || 'U'}&background=random" alt="Avatar">
                            <div class="comment-bubble">
                                <div class="comment-user">${c.authorName || 'Usuario'}</div>
                                <div class="comment-text">${c.content}</div>
                            </div>
                        </div>
                        `).join('') : ''}
                        <form class="comment-form" data-post-id="${post.id}">
                            <img class="avatar" style="width: 32px; height: 32px;"
                                src="https://ui-avatars.com/api/?name=${user?.email || 'U'}&background=4F46E5&color=fff" alt="Avatar">
                            <input type="text" class="comment-input" placeholder="Escribe un comentario..." required>
                        </form>
                    </div>
                `;
                postContainer.appendChild(postEl);
            });

        } catch (error) {
            alert(error.message)
        }

    };

    if (AuthService.isAuthenticate()) {
        initFeed();
    } else {
        window.location.href = 'login.html'
    }

})