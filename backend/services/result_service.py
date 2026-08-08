 def fetch_multiple_results(students):
    fetcher = ResultFetcher(headless=True)
    all_results = []

    for student in students:
        result = fetcher.fetch_result(student)
        if result is not None:
            all_results.append(result)

    fetcher.close()

    if not all_results:
        return None

    final = pd.concat(all_results, ignore_index=True)

    cols_order = ["ERN", "DSA", "OOP", "OS", "SAPM", "WT-I", "SGPA"]
    final = final[[col for col in cols_order if col in final.columns]]

    return final