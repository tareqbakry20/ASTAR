
import json
from telnetlib import STATUS
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt,csrf_protect
from .algocode import a_star

import pprint


@csrf_exempt
def home_view(request):
   
     if request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
           if request.method ==  'POST':
              
               straight_line=json.loads(request.POST.get('line'))
               SourceandGoal=json.loads(request.POST.get('road'))
               Graph=json.loads(request.POST.get('map'))
               heuristic, cost, optimal_path = a_star(SourceandGoal["start"], SourceandGoal["end"],Graph,straight_line)
               result=' -> '.join(city for city in optimal_path)
               return JsonResponse({"heuristic":heuristic,"cost":cost,"result":result})
          
     return render(request,'index.html')


          
    
    



     

 
