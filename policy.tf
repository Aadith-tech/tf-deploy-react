resource "aws_iam_role" "role" {
  name               = "test_role"
  path               = "/"
  assume_role_policy = file("assume-role-policy.json")
}

resource "aws_iam_policy" "custom_policy" {
  name   = "ec2_custom_policy"
  policy = file("ec2-policy.json")
}

resource "aws_iam_role_policy_attachment" "custom_policy_attach" {
  role       = aws_iam_role.role.name
  policy_arn = aws_iam_policy.custom_policy.arn
}


resource "aws_iam_instance_profile" "instance_profile" {
  name = "test_profile"
  role = aws_iam_role.role.name
}
