class SnakeGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        // Game settings
        this.gridSize = 20;
        this.tileCount = this.canvas.width / this.gridSize;
        
        // Game state
        this.snake = [];
        this.food = {};
        this.score = 0;
        this.highScore = localStorage.getItem('snakeHighScore') || 0;
        this.level = 1;
        this.gameRunning = false;
        this.gamePaused = false;
        this.gameOver = false;
        this.direction = { x: 1, y: 0 };
        this.nextDirection = { x: 1, y: 0 };
        this.speed = 8;
        this.frameCount = 0;
        
        // Initialize UI
        this.updateHighScore();
        this.initializeGame();
        this.setupEventListeners();
    }

    initializeGame() {
        // Start with a small snake in the middle
        this.snake = [
            { x: Math.floor(this.tileCount / 2), y: Math.floor(this.tileCount / 2) },
            { x: Math.floor(this.tileCount / 2) - 1, y: Math.floor(this.tileCount / 2) },
            { x: Math.floor(this.tileCount / 2) - 2, y: Math.floor(this.tileCount / 2) }
        ];
        
        this.direction = { x: 1, y: 0 };
        this.nextDirection = { x: 1, y: 0 };
        this.score = 0;
        this.level = 1;
        this.speed = 8;
        this.frameCount = 0;
        this.gameRunning = false;
        this.gamePaused = false;
        this.gameOver = false;
        
        this.generateFood();
        this.draw();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        document.getElementById('startBtn').addEventListener('click', () => this.startGame());
        document.getElementById('pauseBtn').addEventListener('click', () => this.togglePause());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
    }

    handleKeyPress(e) {
        const key = e.key.toLowerCase();
        
        // Arrow keys or WASD
        if (key === 'arrowup' || key === 'w') {
            if (this.direction.y === 0) this.nextDirection = { x: 0, y: -1 };
        } else if (key === 'arrowdown' || key === 's') {
            if (this.direction.y === 0) this.nextDirection = { x: 0, y: 1 };
        } else if (key === 'arrowleft' || key === 'a') {
            if (this.direction.x === 0) this.nextDirection = { x: -1, y: 0 };
        } else if (key === 'arrowright' || key === 'd') {
            if (this.direction.x === 0) this.nextDirection = { x: 1, y: 0 };
        } else if (key === ' ') {
            e.preventDefault();
            if (this.gameRunning) this.togglePause();
        }
    }

    startGame() {
        if (!this.gameRunning) {
            this.gameRunning = true;
            this.gameOver = false;
            this.gamePaused = false;
            document.getElementById('startBtn').disabled = true;
            document.getElementById('pauseBtn').disabled = false;
            document.getElementById('statusMessage').textContent = '';
            this.update();
        }
    }

    togglePause() {
        if (!this.gameRunning) return;
        
        this.gamePaused = !this.gamePaused;
        const statusMsg = document.getElementById('statusMessage');
        
        if (this.gamePaused) {
            statusMsg.textContent = '⏸️ PAUSED';
            statusMsg.classList.add('paused');
        } else {
            statusMsg.textContent = '';
            statusMsg.classList.remove('paused');
        }
    }

    reset() {
        this.initializeGame();
        document.getElementById('startBtn').disabled = false;
        document.getElementById('pauseBtn').disabled = true;
        document.getElementById('statusMessage').textContent = '';
        this.updateUI();
    }

    update() {
        if (!this.gameRunning || this.gamePaused) {
            requestAnimationFrame(() => this.update());
            return;
        }

        this.frameCount++;
        
        if (this.frameCount % Math.floor(60 / this.speed) === 0) {
            this.direction = this.nextDirection;
            
            // Move snake
            const head = { ...this.snake[0] };
            head.x += this.direction.x;
            head.y += this.direction.y;

            // Check wall collision
            if (this.checkWallCollision(head)) {
                this.endGame();
                requestAnimationFrame(() => this.update());
                return;
            }

            // Check self collision
            if (this.checkSelfCollision(head)) {
                this.endGame();
                requestAnimationFrame(() => this.update());
                return;
            }

            this.snake.unshift(head);

            // Check food collision
            if (head.x === this.food.x && head.y === this.food.y) {
                this.score += 10;
                this.updateLevel();
                this.generateFood();
            } else {
                this.snake.pop();
            }

            this.updateUI();
        }

        this.draw();
        requestAnimationFrame(() => this.update());
    }

    checkWallCollision(head) {
        return head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount;
    }

    checkSelfCollision(head) {
        return this.snake.some(segment => segment.x === head.x && segment.y === head.y);
    }

    generateFood() {
        let newFood;
        let collision;
        
        do {
            newFood = {
                x: Math.floor(Math.random() * this.tileCount),
                y: Math.floor(Math.random() * this.tileCount)
            };
            collision = this.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
        } while (collision);
        
        this.food = newFood;
    }

    updateLevel() {
        const newLevel = Math.floor(this.score / 100) + 1;
        if (newLevel !== this.level) {
            this.level = newLevel;
            this.speed = Math.min(15, 8 + this.level);
        }
    }

    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('level').textContent = this.level;
    }

    updateHighScore() {
        document.getElementById('highScore').textContent = this.highScore;
    }

    endGame() {
        this.gameRunning = false;
        this.gameOver = true;
        
        // Update high score
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('snakeHighScore', this.highScore);
            this.updateHighScore();
        }

        const statusMsg = document.getElementById('statusMessage');
        statusMsg.textContent = `💀 GAME OVER! Final Score: ${this.score}`;
        statusMsg.classList.add('game-over');
        
        document.getElementById('startBtn').disabled = false;
        document.getElementById('pauseBtn').disabled = true;
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw grid (optional, subtle)
        this.ctx.strokeStyle = '#111';
        this.ctx.lineWidth = 0.5;
        for (let i = 0; i <= this.tileCount; i++) {
            const pos = i * this.gridSize;
            this.ctx.beginPath();
            this.ctx.moveTo(pos, 0);
            this.ctx.lineTo(pos, this.canvas.height);
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(0, pos);
            this.ctx.lineTo(this.canvas.width, pos);
            this.ctx.stroke();
        }

        // Draw snake
        this.snake.forEach((segment, index) => {
            if (index === 0) {
                // Head
                this.ctx.fillStyle = '#00ff00';
                this.ctx.shadowColor = '#00ff00';
                this.ctx.shadowBlur = 10;
            } else {
                // Body - gradient from bright to darker green
                const brightness = Math.max(80, 255 - (index * 10));
                this.ctx.fillStyle = `rgb(0, ${brightness}, 0)`;
                this.ctx.shadowColor = 'rgba(0, 255, 0, 0.5)';
                this.ctx.shadowBlur = 5;
            }

            this.ctx.fillRect(
                segment.x * this.gridSize + 1,
                segment.y * this.gridSize + 1,
                this.gridSize - 2,
                this.gridSize - 2
            );
        });

        // Reset shadow for food
        this.ctx.shadowColor = 'transparent';
        this.ctx.shadowBlur = 0;

        // Draw food
        this.ctx.fillStyle = '#ff6b6b';
        this.ctx.shadowColor = '#ff6b6b';
        this.ctx.shadowBlur = 10;
        this.ctx.beginPath();
        this.ctx.arc(
            this.food.x * this.gridSize + this.gridSize / 2,
            this.food.y * this.gridSize + this.gridSize / 2,
            this.gridSize / 2 - 2,
            0,
            Math.PI * 2
        );
        this.ctx.fill();

        // Reset shadow
        this.ctx.shadowColor = 'transparent';
        this.ctx.shadowBlur = 0;
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new SnakeGame('gameCanvas');
});
