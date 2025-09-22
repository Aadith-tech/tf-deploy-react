resource "aws_vpc" "myVPC" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "myVPC"
  }
}


resource "aws_subnet" "public_subnet" {
  cidr_block = "10.0.2.0/24"
  vpc_id     = aws_vpc.myVPC.id
  tags = {
    Name = "public_subnet"
  }
}

resource "aws_internet_gateway" "myIGW" {
  vpc_id = aws_vpc.myVPC.id
  tags = {
    Name = "myIGW"
  }
}

resource "aws_route_table" "MyRouteTable" {
  vpc_id = aws_vpc.myVPC.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.myIGW.id
  }
}

resource "aws_route_table_association" "public_sub_asso" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.MyRouteTable.id
}
