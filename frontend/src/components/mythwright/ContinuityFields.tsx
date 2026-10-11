import { continuityFields } from "../../stores/mythwrightStore";
import type { ContinuityDraft } from "../../stores/mythwrightStore";

interface ContinuityFieldsProps {
  draft: ContinuityDraft;
  onChange: (draft: ContinuityDraft) => void;
}
export function ContinuityFields({ draft, onChange }: ContinuityFieldsProps) {
  return (
    <div className="mw-fields-grid">
      {continuityFields.map(({ key, label }) => (
        <label className="mw-field" key={key}>
          {label}
          <textarea
            rows={3}
            placeholder="Unspecified"
            value={draft.fields[key]}
            onChange={(event) =>
              onChange({
                ...draft,
                fields: { ...draft.fields, [key]: event.target.value },
              })
            }
          />
        </label>
      ))}
    </div>
  );
}
