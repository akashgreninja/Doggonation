from torchvision import models
import torch
from PIL import Image
import urllib.request 
from torchvision import transforms

class identifydog:
  def run_check(imageurl):
      dog_breeds = ['Afghan hound', 'Airedale', 'American Staffordshire terrier', 'Australian terrier', 'Basset hound', 
                    'Beagle', 'Bernese mountain dog', 'Bloodhound', 'Border collie', 'Boxer', 'Bull mastiff', 'Bulldog',
                    'Cairn terrier', 'Cavalier King Charles spaniel', 'Chihuahua', 'Chow chow', 'Cocker spaniel', 'Collie', 
                    'Dalmatian', 'Doberman pinscher', 'English cocker spaniel', 'English setter', 'English springer spaniel', 
                    'French bulldog', 'German shepherd', 'German short-haired pointer', 'Golden retriever', 'Great Dane', 
                    'Greyhound', 'Irish setter', 'Irish wolfhound', 'Jack Russell terrier', 'Japanese spaniel', 'Keeshond', 
                    'Labrador retriever', 'Lhasa apso', 'Maltese', 'Newfoundland', 'Old English sheepdog', 'Pekingese', 
                    'Pembroke Welsh corgi', 'Pomeranian', 'Poodle', 'Pug', 'Rottweiler', 'Saint Bernard', 'Shar-pei', 
                    'Shih-tzu', 'Siberian husky', 'Staffordshire bull terrier', 'Standard schnauzer', 'Toy poodle', 
                    'Weimaraner', 'West Highland white terrier', 'Yorkshire terrier']

      alexnet = models.alexnet(pretrained=True)


      transform = transforms.Compose([            #[1]
      transforms.Resize(256),                    #[2]
      transforms.CenterCrop(224),                #[3]
      transforms.ToTensor(),                     #[4]
      transforms.Normalize(                      #[5]
      mean=[0.485, 0.456, 0.406],                #[6]
      std=[0.229, 0.224, 0.225]                  #[7]
      )])
      url = imageurl
      urllib.request.urlretrieve(url, 'test.jpg')

      img = Image.open('test.jpg')

      img_t = transform(img)
      batch_t = torch.unsqueeze(img_t, 0)

        
      alexnet.eval()

      out = alexnet(batch_t)

      with open('E:/doginsta/backend/imagenet_classes.txt') as f:
        classes = [line.strip() for line in f.readlines()]
      _, index = torch.max(out, 1)
      
      percentage = torch.nn.functional.softmax(out, dim=1)[0] * 100

      dog=classes[index[0]]
      dog=dog.split(", ")
      print(dog)
      for i in dog:

        if i in dog_breeds:
          return i,percentage
        else:
          return 0