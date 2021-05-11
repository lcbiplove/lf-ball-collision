function Ball(x, y, radius, color, context) {
  this.x = x;
  this.y = y;

  this.radius = !radius ? DEFAULT_RADIUS : radius;
  this.speed = {
    x: (Math.random() - 0.75) * 8,
    y: (Math.random() - 0.75) * 8
  };
  this.color = color;

  this.draw = () => {
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.save();
    context.fill();
    context.restore();
  };

  const handlerFourSideCollision = canvasProps => {
    if (
      this.x - this.radius <= 0 ||
      this.x + this.radius >= canvasProps.width
    ) {
      this.speed.x = -this.speed.x;
    }

    if (
      this.y - this.radius <= 0 ||
      this.y + this.radius >= canvasProps.height
    ) {
      this.speed.y = -this.speed.y;
    }

    this.x += this.speed.x;
    this.y += this.speed.y;
  };

  const rotate = (speed, angle) => {
    return (newSpeed = {
      x: speed.x * Math.cos(angle) - speed.y * Math.sin(angle),
      y: speed.x * Math.sin(angle) + speed.y * Math.cos(angle)
    });
  };

  const handleTwoBallsCollision = balls => {
    balls.forEach(ball => {
      const dx = ball.x - this.x;
      const dy = ball.y - this.y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      // If balls collided to each other
      if (this !== ball && distance < this.radius + ball.radius) {
        const xDeltaVel = this.speed.x - ball.speed.x;
        const yDeltaVel = this.speed.y - ball.speed.y;

        if (xDeltaVel * dx + yDeltaVel * dy >= 0) {
          const angle = -Math.atan2(ball.y - this.y, ball.x - this.x);

          const mass = 1;
          const m1 = mass;
          const m2 = mass;

          const u1 = rotate(this.speed, angle);
          const u2 = rotate(ball.speed, angle);

          const v1 = {
            x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
            y: u1.y
          };
          const v2 = {
            x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
            y: u2.y
          };

          const finalVel1 = rotate(v1, -angle);
          const finalVel2 = rotate(v2, -angle);

          this.speed.x = finalVel1.x;
          this.speed.y = finalVel1.y;
          ball.speed.x = finalVel2.x;
          ball.speed.y = finalVel2.y;
        }
      }
    });
  };

  this.update = (balls, canvasProps) => {
    this.draw();

    handlerFourSideCollision(canvasProps);

    handleTwoBallsCollision(balls);
  };
}
