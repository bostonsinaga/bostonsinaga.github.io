const light_beam = document.querySelector(".header-man-light_beam"),
  invisible = document.querySelector(".header-man-invisible"),
  light_beam_ctx = light_beam.getContext("2d"),
  invisible_ctx = invisible.getContext("2d");

const passportPhoto = new Image();
passportPhoto.src = "../res/passport-photos/img-2.png"; 

// as callback
function drawPassportPhoto() {

  invisible_ctx.drawImage(
    passportPhoto,
    -invisible.height * 0.15, invisible.height * 0.2,
    invisible.width * 0.8, invisible.height * 0.8
  );

  invisible_ctx.restore();
}

function drawLightBeam() {

  // match canvas resolution with CSS size
  const dpr = window.devicePixelRatio || 1;
  light_beam.width = light_beam.clientWidth * dpr;
  light_beam.height = light_beam.clientHeight * dpr;
  invisible.width = light_beam.width;
  invisible.height = light_beam.height;

  const circleX = 0.25 * light_beam.width,
    circleY = light_beam.width - circleX,
    radius = circleX,
    mysteriousValue = radius / 2.5;

  const circle135X = circleX + radius * Math.cos(135/180 * Math.PI),
    circle135Y = circleY - radius * Math.sin(135/180 * Math.PI),
    circle315X = circleX + radius * Math.cos(315/180 * Math.PI),
    circle315Y = circleY - radius * Math.sin(315/180 * Math.PI);

  /** Light Beam */

  light_beam_ctx.fillStyle = "#56a9ff";
  light_beam_ctx.beginPath();

  light_beam_ctx.arc(
    circleX, circleY, radius, 0, Math.PI * 2
  );  

  light_beam_ctx.moveTo(circle135X, circle135Y);
  light_beam_ctx.lineTo(circleY - mysteriousValue, 0);
  light_beam_ctx.lineTo(light_beam.width, 0);
  light_beam_ctx.lineTo(light_beam.width, circleX + mysteriousValue);
  light_beam_ctx.lineTo(circle315X, circle315Y);
  light_beam_ctx.fill();
  light_beam_ctx.closePath();

  /** Invisible */

  invisible_ctx.save();
  invisible_ctx.beginPath();

  invisible_ctx.arc(
    circleX, circleY, radius, 0, Math.PI * 2
  );

  invisible_ctx.moveTo(circle135X, circle135Y);
  invisible_ctx.lineTo(circle135X, 0);
  invisible_ctx.lineTo(invisible.width, 0);
  invisible_ctx.lineTo(invisible.width, circleX + mysteriousValue);
  invisible_ctx.lineTo(circle315X, circle315Y);
  invisible_ctx.clip();

  // draw image onto canvas after it loaded
  if (passportPhoto.complete && passportPhoto.naturalWidth !== 0) {
    drawPassportPhoto();
  }
  else passportPhoto.onload = drawPassportPhoto;
}

window.addEventListener("resize", drawLightBeam);
drawLightBeam();

