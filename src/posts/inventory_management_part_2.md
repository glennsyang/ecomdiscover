---
title: My Quest for the Ultimate Amazon FBA Management System
subtitle: "#4 - Inventory Management Part 2"
filename: quest_for_ultimate_amazon_fba_management_system_inventory_management_part_2
date: 2021-05-06
author: Doug Short
category:
  - Inventory Management
  - Listing Optimization
  - Profit Monitoring
tags:
  - ecommercetools
  - amazonfba
  - inventorymanagement
featuredImage: ../images/charts_and_graphs.jpg
---

[Last post](../blog/quest_for_ultimate_amazon_fba_management_system_inventory_management_part_1) I discussed some basic functions that I want my Amazon inventory management system to have. 
The system should have:
* Inventory levels and sales data for each sku
* Product specific data like supplier, cost, lead time, and profit
* Reorder recommendations
* Ability to generate a supplier specific purchase order

[Hulft](https://ecomdiscover.com/reviews/hulft-online-services) created a shared Google sheet that has relevant Amazon reports.  We used the Amazon restock report since it has the most useful data.  There are separate reports for each marketplace (US and Canada) and they are updated every 1-2 hours.  Now that the raw data is there, the next step is to do something useful with it.

#### Creating my inventory management system with Google Sheets
I created a separate Google sheet that has two tabs, again one for each marketplace.  I also created a tab for each marketplace that has manual data - really a worksheet.  As much as I want this to be automatic I also need a place for data that doesn’t change - for example to assign each sku to a supplier, enter my purchase cost, lead time, prep specific notes, etc.  These tabs are going to develop into a master product database.  I want to keep it as simple as possible but it is great to have a central repository for this useful information.

Now each marketplace worksheet can start pulling in data from the Amazon restock reports and the manual data that I entered.  It ended up being easy to add columns and formulas to manipulate the data:

![Google Sheet Amazon restock report](../images/googlesheet_data.png#display=table;width=640px;height=100%;margin-bottom=30px;margin-top=20px;margin-left=auto;margin-right=auto;foo=bar)

Most of the data was just taking it from different places and putting it all in one place.  However some of the information that I needed to see required more calculations.  For example, how many should I order?  This is the secret sauce and there are simple and complex ways to figure this out.  Advanced systems start taking into account seasonality and use all kinds of fancy ways of figuring this out.  However the reality is they are all just estimates and nobody knows what will be ordered tomorrow.

I ended up with something like this:

![Final restock report](../images/final_restock_report.png#display=table;width=640px;height=100%;margin-bottom=30px;margin-top=20px;margin-left=auto;margin-right=auto;foo=bar)

The system takes into account how many units were sold in the last 30 days, as well as how many are in stock and on the way to Amazon.  Each sku gets assigned a “restock factor” which is kind of a weighting to the recommendations.  Also the number of restocks a month, lead time, and case quantity.  Taking all those factors into account the formula recommends a reorder quantity.  

This is complex enough to be meaningful but simple enough to understand.  Amazon and most other inventory management software makes order quantity recommendations but you don’t know why it is recommending that amount.  This way I can compare my recommendation with Amazon’s recommendation, maybe tweak the input factors for that sku if it is consistently running out or overstocked, and examine the underlying factors as needed.

> Amazon and most other inventory management software makes order quantity recommendations but you don’t know why it is recommending that amount.

#### Generating Purchase Orders
Great, I have lots of data and it is automatically updating from Amazon!  Now I need to take action on it.  How do I turn this into a purchase order?  I thought about this quite a bit.  It has to be easy to use with minimal clicks.  What I ended up doing is putting a checkbox beside each SKU.  I filter by supplier, check the boxes for the sku’s that I want to reorder, copy over the recommended order quantities into an order quantity column (or manually enter the quantities if I have control issues) and run a script.

I should explain the script a bit better.  Scripts in Google Sheets unlock very powerful functionality.  I knew that, but hadn’t had much of an opportunity to explore it before.  I needed some help to get them working correctly, but here is what this “Create Purchase Order” script does:

* I have a master purchase order template made up.  The script copies all SKUs selected to order to a copy of the purchase order template along with relevant data like order quantity, supplier part number and cost
* A copy of the purchase order data is also logged in a separate Order History sheet that keeps a running log of all product ordered

In practice this system works beautifully.  To create an order I go to the reorder worksheet, filter by supplier, select the items to order and click the script button.  Then I just open the generated purchase order, select the ship to address from a dropdown selection cell, and print the purchase order to send to the supplier.

#### Next Steps
Now that the basic functions are there I need to do the fine tuning.  I need this system to be as simple as possible so I can train others to use it.  Next steps are to see if I can reduce (or hide) some less useful columns to reduce the visual clutter and make it more intuitive.  Lots of formatting to do and also a bit of formula cleanup to make it more robust.

> I need this system to be as simple as possible so I can train others to use it.

The main data that I currently need to add is the estimated profit per item.  I could be losing money on a product but if it is selling, Amazon will tell me to order lots more!  [Forecastly](https://ecomdiscover.com/reviews/forecastly) has an estimated profit column but it is sometimes way off - it might be based on an FBM offer without shipping and so be way off.

![What should I do???](../images/productivity_dilemma.jpg#display=table;width=512px;height=100%;margin-bottom=30px;margin-top=20px;margin-left=auto;margin-right=auto;foo=bar)