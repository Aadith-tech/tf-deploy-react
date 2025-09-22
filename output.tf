output "user_data" {
  value = file("user_data.sh")
}

output "ec2_policy" {
  description = "Policy of EC2 instance"
  value       = file("ec2-policy.json")
}

output "instance_public_ipv4" {
  description = "Public IPv4 address of the EC2 instance"
  value       = aws_instance.myServer.public_ip
}
output "instance_url" {
  description = "url of ec2 instance"
  value       = "http://${aws_instance.myServer.public_ip}:3000"
}
