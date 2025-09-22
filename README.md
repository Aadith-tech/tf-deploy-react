![Terraform AWS Cloud Architecture](terraform_proj.png)

# React + Express App with Terraform Deployment

This repository demonstrates how to deploy a **full-stack React and Express application** on **AWS EC2** using **Terraform**. The React front-end and Express back-end code are synced from an **S3 bucket** to an EC2 instance, where the React app is built, and both the front-end and back-end are run automatically upon EC2 startup.

## Overview

This project contains:
- **React** front-end
- **Express.js** back-end
- **Terraform** infrastructure setup for provisioning AWS resources

The setup includes:
- **EC2 instance** running both the React front-end and Express back-end.
- **AWS S3** for storing the front-end and back-end code.
- **Terraform** scripts to provision the required AWS infrastructure.
- **Automated deployment** on EC2 instance startup using a custom `user_data.sh` script.

### Important Note:
Before running the deployment, you **must** manually upload the following to your **S3 bucket**:
- Front-end React build (e.g., `dist/` folder).
- Back-end Express server code.

The EC2 instance will sync these files from S3 and start the application. You will also need to provide your **S3 bucket name** in the `user_data.sh` script and set up the correct IAM **EC2 policy** for S3 access.

---

## Architecture

The application is deployed using the following components:
- **EC2 Instance**: Runs both React and Express apps.
- **AWS S3**: Stores the front-end and back-end code.
- **Terraform**: Provisions the required AWS infrastructure, including the EC2 instance, IAM roles, and policies.
- **User Data**: A shell script (`user_data.sh`) that automatically sets up the environment on EC2, installs dependencies, builds the React app, syncs the code from S3, and starts both the front-end and back-end.

---

## Project Structure
```bash
/project-root
├── /client (React front-end)
├── /server (Express back-end)
├── /terraform
│   ├── main.tf               # Terraform configuration for infrastructure
│   ├── provider.tf           # AWS provider setup
│   ├── security_grp.tf       # Security groups configuration
│   ├── ec2.tf                # EC2 instance configuration
│   ├── vpc.tf                # VPC configuration
│   ├── policy.tf             # IAM policy configuration
│   ├── output.tf             # Outputs of Terraform execution
│   ├── user_data.sh          # Script to install dependencies, sync code, build, and start apps
│   ├── assume-role-policy.json
└── README.md                 # Project documentation (this file)
```

---

## Getting Started

### Prerequisites

Before running the application, ensure that you have the following installed:
- [Node.js](https://nodejs.org/)
- [Terraform](https://www.terraform.io/)
- [AWS CLI](https://aws.amazon.com/cli/)

Additionally, ensure that you have an AWS account set up and your **AWS credentials** configured via `aws configure` or environment variables.

---

### Step 1: Prepare S3 Bucket

Before running the deployment, you need to **manually upload** your front-end and back-end code to an **S3 bucket**.
1. **Clone the repository**:
   - Run `git clone https://github.com/Aadith-tech/tf-deploy-react`
   - cd `tf-deploy-react`
   - Go to each Front-end and sever folder and install the Dependencies run `npm install`

3. **Upload the Front-End React Build**:
   - Run `npm run build` in the `/Front-end` directory.
   - Upload the `dist/` directory contents to your **S3 bucket** under the `front-end/` folder.

4. **Upload the Back-End Express Code**:
   - Run `npm run build` in the `/server` directory.
   - Upload the entire `/server` directory contents to your **S3 bucket** under the `server/` folder.


### Step 2: Configure `user_data.sh` script and `ec2-policy.json` 

You must configure the `user_data.sh` script before running the Terraform deployment:

1. **Set Your S3 Bucket Name**:
   In `/user_data.sh`, find and replace `your-bucket-name` with the actual name of your S3 bucket:

   ```bash
   aws s3 sync s3://your-bucket-name/front-end/ /home/ubuntu/front-end/
   aws s3 sync s3://your-bucket-name/server/ /home/ubuntu/server/
   ```
2. **Set Proper IAM Permissions for EC2**:
   In `/ec2-policy.json` , find and replace `your-bucket-name` with the actual name of your S3 bucket:
   ```bash
   {
      "Effect": "Allow",
      "Action": ["s3:ListBucket", "s3:GetObject"],
      "Resource": [
        "arn:aws:s3:::your-bucket-name",
        "arn:aws:s3:::your-bucket-name/*"
      ]
    }
   ```
### Step 3: Terraform Setup

1. Before applying Terraform, ensure you have configured your AWS credentials.
   Run `terraform init`
2. To apply the Terraform configuration and deploy the infrastructure:
   Run `terraform apply`
3. Clean UP
   Run `terraform destroy`

### Step 4: Automatic Deployment on EC2

The EC2 instance will run the custom `user_data.sh` script to automatically:

1. Install **Node.js**, **AWS CLI**, and necessary dependencies.
2. Sync the front-end and back-end code from the **S3 bucket** to the EC2 instance.
3. **Build** the React front-end (`npm run build`).
4. Start the **Express server**.
   
After these steps, the React app will be available at:
`http:<EC2 IP>:3000`


   
