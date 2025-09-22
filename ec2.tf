resource "aws_instance" "myServer" {
  associate_public_ip_address = true
  ami                         = "ami-0360c520857e3138f"
  user_data                   = file("user_data.sh")
  instance_type               = "t2.micro"
  subnet_id                   = aws_subnet.public_subnet.id
  iam_instance_profile        = aws_iam_instance_profile.instance_profile.name
  security_groups             = [aws_security_group.EC2_SG.id]
  tags = {
    name = "MyServer"
  }
}
