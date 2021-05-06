---
title: My Quest for the Ultimate Amazon FBA Management System
subtitle: "#3 - Inventory Management Part 1"
filename: quest_for_ultimate_amazon_fba_management_system_inventory_management_part_1
date: 2021-01-05
author: Doug Short
category:
  - Inventory Management
  - Listing Optimization
  - Profit Monitoring
tags:
  - ecommercetools
  - amazonfba
  - inventorymanagement
featuredImage: ../images/comic_super_bowl.png
---

Last time I wrote about [the two types of information essential](../blog/quest_for_ultimate_amazon_fba_management_system_project_goals) to running my business. I currently have Amazon data from two different marketplaces - Amazon.ca and Amazon.com.  Between the two I have several hundred active products.  This inventory management system is really just about keeping those products in stock with the least amount of money invested in inventory.  The theory is easy, but each of those products has fluctuating demand (often wildly fluctuating).  Also the products come from various suppliers in various countries with lead times of 2 days to 3 months.  

#### Initial attempts with Inventory Management Software
Seller Central on Amazon actually has a nice little inventory management function built in.  You can input your costs, supplier lead times, and a few more bits of information and then Amazon will politely tell you what it thinks you should reorder.  However the function is very basic - there is no way to modify the system recommendations or do much with the data.  I haven’t experimented with it very much, partially because I don’t feel particularly like telling Amazon my product costs and supplier information.  They make my life difficult enough with the data that they have now.

> My ideal system would allow me to easily monitor stock levels of all products, group by supplier, see what needs to be reordered now and then generate a purchase order that I can send to the supplier. 

Just as important, I need to be able to see what I have already ordered so I can keep track of what is on the way.  Actually that was the main requirement that pushed me into using inventory management software.  I was painfully using spreadsheets and available reports to do inventory management.  However one supplier consistently had backorders. If I ordered 30 different products about half of them would be backordered weeks or months.  I was going crazy trying to keep track of what I had ordered already.  Usually I would forget I ordered something and order it a few more times.  Then when the item was available I would get a much larger quantity than I needed all at once.  So frustrating!

#### My experience with Forecastly
I tested a few inventory management systems that were integrated with Amazon.  The one that I settled on was [Forecastly](https://ecomdiscover.com/reviews/forecastly), a nice little system that managed multiple marketplaces and had the core functionality needed.  It was definitely functional - I can go into the software, see what products need to be reordered, do some quick listing research, and create a purchase order in just a few minutes.  However it has some very frustrating limitations.  First, if you order in a different currency than you sell in then you have to generate purchase orders manually.  Second, if you sell in different quantities than you order in (for example you buy 6 units but sell it as a pack of six) then you have to generate purchase orders manually.  Third, if you want an order to ship to any destination other than your main location then you have to generate your purchase order manually.  So about 95% of my purchase orders are generated manually.  I used [Forecastly](https://ecomdiscover.com/reviews/forecastly) for about 3 years and if I suggest any improvement the friendly response is: 

> “We feel that the current functionality offers good value”

So they aren’t going to make any improvements.  There is some great software out there for inventory management, but I haven’t found anything that is flexible enough to work with the flow I need.  Working with larger ERP systems I know how expensive and cumbersome they can be - what I want is a nice light flexible solution.

#### The perfect system
In my head, the perfect inventory system for my business is quite simple.  I would have all of the data available from Amazon - inventory levels and sales data.  I would add product specific data like supplier, cost, lead time etc.  The system would make reorder recommendations - then I accept or adjust the order quantities and the appropriate purchase order is created for sending to the supplier.

![The perfect inventory management system](../images/tabular_data.jpg#display=table;width=512px;height=100%;margin-bottom=30px;margin-top=20px;margin-left=auto;margin-right=auto;foo=bar)

#### Hulft and Google Sheets - data integration made easy
Amazon makes some great data available.  There are a plethora of reports available for download.  However I need that data in a document that is automatically updated - really I have no desire to have anyone manually downloading reports.  Through a random connection on Reddit one day I started talking to [Hulft](https://ecomdiscover.com/reviews/hulft-online-services), a data integration company that was working on ecommerce connections and was happy to run some experiments with me.  They had set up some similar types of connections with other software, but after some consideration I wanted to try developing this solution in Google Sheets.  Sure Excel is more powerful, but it doesn’t have the collaboration ability of Sheets and I want to have VA’s or employees able to use the data easily.  There are some excellent new database tools available, but the more I looked into it the more Sheets made sense.  It is very well supported, free, has all the basic functions that I could possibly need, built in revision history, and with scripts you can extend functions to almost anything you can imagine.

After some initial meetings [Hulft](https://ecomdiscover.com/reviews/hulft-online-services) got the database connection working.  It was actually a bit of a shock after thinking about this for so long to see the data just present in a sheet and updating.  I have tried so many different tools, but all of my data was pulled in and formatted for that specific service.  Here I had the raw data ready for anything and it was really a bit overwhelming.  I knew I had to do something with it though, so I set out to try some basic functions.  In the [next post](../blog/quest_for_ultimate_amazon_fba_management_system_inventory_management_part_2), I will show the functions that I started with.

![Sample inventory management system](../images/spreadsheet.png#display=table;width=512px;height=100%;margin-bottom=30px;margin-top=20px;margin-left=auto;margin-right=auto;foo=bar)
