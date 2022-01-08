import pandas as pd
df = pd.read_csv("./tornados.csv")
df[["MO", "SLAT", "SLON", "MAG"]].to_csv("./data/tornados.csv")