import pandas as pd

months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


df = pd.read_csv("./fire.csv")
df["discovery_month"] = df["discovery_month"].apply(lambda monthAbbr: months.index(monthAbbr)+1)
df[["latitude", "longitude", "discovery_month", "fire_size"]].to_csv("./fire.csv")
