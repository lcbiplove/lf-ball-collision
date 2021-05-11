function BallCollision(props) {
  this.canvas = document.getElementById(props.id);
  this.context = this.canvas.getContext("2d");
  this.width = props.width || DEFAULT_WIDTH;
  this.height = props.height || DEFAULT_HEIGHT;

  this.numOfBalls = props.numOfBalls || DEFAULT_NUM_OF_BALLS;
  this.colors = props.colors || DEFAULT_COLORS;
  console.log(this.colors);
  this.balls = [];
  this.ballSizes = props.ballSizes || DEFAULT_BALL_SIZES;

  this.canvas.width = this.width;
  this.canvas.height = this.height;

  const balls = [];

  for (let ind = 0; ind < this.numOfBalls; ind++) {
    const x = Math.random() * this.width;
    const y = Math.random() * this.height;

    const color = this.colors[ind % this.colors.length];
    const radius = this.ballSizes[ind % this.ballSizes.length];

    radius / balls.push(new Ball(x, y, radius, color, this.context));
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
