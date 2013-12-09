Servo leftServo;
Servo rightServo;

int leftPin  = 10;
int rightPin = 11;

int freeze   = 90;
int speed    = 20;
int forward  = freeze + speed;
int back     = freeze - speed;
int driveTime = 1000;

int leftSpeed;
int rightSpeed;

int ledPin = 4;

void setup() { 

  pinMode(ledPin,OUTPUT);
  leftServo.attach(leftPin);
  rightServo.attach(rightPin);
  stopDriving(0);
  
  Spark.function("drive", driveCommand); 

} 
 
void loop() { } 

int driveCommand(String command) { 
  blinkLed();
  
  int length = command.length();
  for(int i=0; i<length; i++){
    String c = command.substring(i,i+1);
    if(c == "F"){
      driveForward();
    }else if(c == "B"){
      driveBackward();
    }else if(c == "P"){
      stopDriving(1);
    }else if(c == "L"){
      turnLeft(90);
    }else if(c=="l"){
      turnLeft(45);
    }else if(c == "R"){
      turnRight(90);
    }else if(c == "r"){
      turnRight(45);
    }else if(c == "S"){
      turnRight(360);
    }else{
      stopDriving(0);
    }
  }
  
  return length;
}

void blinkLed(){
  digitalWrite(ledPin,HIGH);
  delay(500);
  digitalWrite(ledPin,LOW);
}

void driveForward(){
  leftServo.write(back);
  rightServo.write(forward);
  delay(driveTime);
  stopDriving(0);
}

void driveBackward(){
  leftServo.write(forward);
  rightServo.write(back);
  delay(driveTime);
  stopDriving(0);
}

void turnLeft(int deg){
  leftServo.write(back);
  rightServo.write(back);
  delay(driveTime*((float)deg/90));
  stopDriving(0);  
}

void turnRight(int deg){
  leftServo.write(forward);
  rightServo.write(forward*1);
  delay(driveTime*((float)deg/90));
  stopDriving(0);  
}

void stopDriving(int pause){
  leftServo.write(freeze);
  rightServo.write(freeze);
  
  if(pause == 1){
    delay(driveTime);
  }
}

