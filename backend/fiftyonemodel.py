from torchvision import models
import torch
from PIL import Image
import urllib.request 
from torchvision import transforms

# print(dir(models))

alexnet = models.alexnet(pretrained=True)


transform = transforms.Compose([            #[1]
 transforms.Resize(256),                    #[2]
 transforms.CenterCrop(224),                #[3]
 transforms.ToTensor(),                     #[4]
 transforms.Normalize(                      #[5]
 mean=[0.485, 0.456, 0.406],                #[6]
 std=[0.229, 0.224, 0.225]                  #[7]
 )])
url = "https://th.bing.com/th/id/OIP.RZit-f8kmjDv27MWUOguJwHaEo?pid=ImgDet&rs=1"
urllib.request.urlretrieve(url, 'test.jpg')

img = Image.open('test.jpg')

img_t = transform(img)
batch_t = torch.unsqueeze(img_t, 0)

	
alexnet.eval()

out = alexnet(batch_t)

with open('imagenet_classes.txt') as f:
  classes = [line.strip() for line in f.readlines()]
_, index = torch.max(out, 1)
 
percentage = torch.nn.functional.softmax(out, dim=1)[0] * 100
 
print(classes[index[0]], percentage[index[0]].item())
# # Load the YOLOv5 model
# model = torch.hub.load('ultralytics/yolov5', 'yolov5s', autoshape=False, pretrained=False)


# # Fetch the image from the URL
# url = "https://firebasestorage.googleapis.com/v0/b/doggonation-612e8.appspot.com/o/posts%2Fundefined?alt=media&token=c97b2f8d-e28b-4bb9-9f1e-0c04e6388348"
# response = requests.get(url)




# # Perform object detection
# results = model(response)

# # Extract detections that correspond to dogs
# dog_results = results.pred[results.pred[:, 5] == 16]

# # Print the number of dogs detected
# print(f"Detected {len(dog_results)} dogs")
