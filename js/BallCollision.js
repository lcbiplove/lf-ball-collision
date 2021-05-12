function BallCollision(props) {
  this.canvas = document.getElementById(props.id);
  this.context = this.canvas.getContext("2d");
  this.width = props.width || DEFAULT_WIDTH;
  this.height = props.height || DEFAULT_HEIGHT;

  this.numOfBalls = props.numOfBalls || DEFAULT_NUM_OF_BALLS;
  this.colors = props.colors || DEFAULT_COLORS;

  this.balls = [];
  this.ballSizes = props.ballSizes || DEFAULT_BALL_SIZES;

  this.canvas.width = this.width;
  this.canvas.height = this.height;

  const balls = [];

  const randomPosition = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  for (let ind = 0; ind < this.numOfBalls; ind++) {
    const color = this.colors[ind % this.colors.length];
    const radius = this.ballSizes[ind % this.ballSizes.length];

    const x = randomPosition(radius, this.width - radius);
    const y = randomPosition(radius, this.height - radius);

    balls.push(new Ball(x, y, radius, color, this.context));
  }

  this.balls = balls;

  this.draw = () => {
    this.context.clearRect(0, 0, this.width, this.height);
  };

  this.update = () => {
    window.requestAnimationFrame(() => this.update());

    this.context.clearRect(0, 0, this.width, this.height);

    this.balls.forEach(ball => ball.update(this.balls, this));
  };

  this.update();
}
