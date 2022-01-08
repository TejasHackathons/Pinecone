import pandas as pd
import numpy as np

pacific = pd.read_csv("./pacific.csv")
atlantic = pd.read_csv("./atlantic.csv")
combined = pd.concat([pacific, atlantic])
combined["Month"] = combined["Date"].astype(str).str.slice(4, 6).astype(np.int32)
combined["Latitude"] = combined["Latitude"].astype(str).str.slice(0, -1).astype(np.float32)
combined["Longitude"] = combined["Longitude"].astype(str).str.slice(0, -1).astype(np.float32)
combined[["Month", "Latitude", "Longitude", "Maximum Wind"]].to_csv("./data/hurricanes.csv")
