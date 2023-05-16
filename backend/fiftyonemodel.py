from torchvision import models
import torch
from PIL import Image
import urllib.request 
from torchvision import transforms

class identifydog:
  def run_check(imageurl):
      dog_breeds2 = [
    'Chihuahua', 'Japanese spaniel', 'Maltese dog', 'Pekinese', 'Shih-Tzu',
    'Blenheim spaniel', 'papillon', 'toy terrier', 'Rhodesian ridgeback',
    'Afghan hound', 'basset hound', 'beagle', 'bloodhound', 'bluetick',
    'black-and-tan coonhound', 'Walker hound', 'English foxhound', 'redbone',
    'borzoi', 'Irish wolfhound', 'Italian greyhound', 'whippet', 'Ibizan hound',
    'Norwegian elkhound', 'otterhound', 'Saluki', 'Scottish deerhound',
    'Weimaraner', 'Staffordshire bull terrier', 'American Staffordshire terrier',
    'Bedlington terrier', 'Border terrier', 'Kerry blue terrier', 'Irish terrier',
    'Norfolk terrier', 'Norwich terrier', 'Yorkshire terrier',
    'wire-haired fox terrier', 'Lakeland terrier', 'Sealyham terrier',
    'Airedale terrier', 'cairn terrier', 'Australian terrier',
    'Dandie Dinmont terrier', 'Boston terrier', 'miniature schnauzer',
    'giant schnauzer', 'standard schnauzer', 'Scotch terrier', 'Scottish terrier',
    'West Highland white terrier', 'Lhasa', 'flat-coated retriever',
    'curly-coated retriever', 'golden retriever', 'Labrador retriever',
    'Chesapeake Bay retriever', 'German short-haired pointer', 'vizsla',
    'English setter', 'Irish setter', 'Gordon setter', 'Brittany spaniel',
    'clumber', 'English springer', 'Welsh springer spaniel',
    'cocker spaniel', 'Sussex spaniel', 'Irish water spaniel', 'kuvasz',
    'schipperke', 'groenendael', 'malinois', 'briard', 'kelpie', 'komondor',
    'Old English sheepdog', 'Shetland sheepdog', 'collie', 'Border collie',
    'Bouvier des Flandres', 'Rottweiler', 'German shepherd', 'Doberman',
    'miniature pinscher', 'Greater Swiss Mountain dog', 'Bernese mountain dog',
    'Appenzeller', 'EntleBucher', 'boxer', 'bull mastiff', 'Tibetan mastiff',
    'French bulldog', 'Great Dane', 'Saint Bernard', 'Eskimo dog', 'malamute',
    'Siberian husky', 'dalmatian', 'affenpinscher']
      dog_breeds1 = [
    'Tibetan terrier', 'chrysanthemum dog', 'silky terrier', 'Sydney silky',
    'soft-coated wheaten terrier', 'West Highland white terrier', 'Lhasa', 'Lhasa apso',
    'flat-coated retriever', 'curly-coated retriever', 'golden retriever', 'Labrador retriever',
    'Chesapeake Bay retriever', 'German short-haired pointer', 'vizsla', 'Hungarian pointer',
    'English setter', 'Irish setter', 'red setter', 'Gordon setter', 'Brittany spaniel',
    'clumber', 'clumber spaniel', 'English springer', 'English springer spaniel',
    'Welsh springer spaniel', 'cocker spaniel', 'English cocker spaniel', 'cocker',
    'Sussex spaniel', 'Irish water spaniel', 'kuvasz', 'schipperke', 'groenendael',
    'malinois', 'briard', 'kelpie', 'komondor', 'Old English sheepdog', 'bobtail',
    'Shetland sheepdog', 'Shetland sheep dog', 'Shetland', 'collie', 'Border collie',
    'Bouvier des Flandres', 'Bouviers des Flandres', 'Rottweiler', 'German shepherd',
    'German shepherd dog', 'German police dog', 'alsatian', 'Doberman', 'Doberman pinscher',
    'miniature pinscher', 'Greater Swiss Mountain dog', 'Bernese mountain dog', 'Appenzeller',
    'EntleBucher', 'boxer', 'bull mastiff', 'Tibetan mastiff', 'French bulldog',
    'Great Dane', 'Saint Bernard', 'St Bernard', 'Eskimo dog', 'husky', 'malamute', 'malemute',
    'Alaskan malamute', 'Siberian husky', 'dalmatian', 'coach dog', 'carriage dog',
    'affenpinscher', 'monkey pinscher', 'monkey dog'
]

      dog_breeds=dog_breeds1 + dog_breeds2
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
      returnlist=[]
      for i in dog:

        if i in dog_breeds:
          returnlist.append(i)
      if returnlist==[]:
        return None
      else:
        print(returnlist)
        return returnlist